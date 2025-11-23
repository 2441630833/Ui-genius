'use strict';
const crypto = require('crypto');
const db = uniCloud.database();
const usersCollection = db.collection('uni-id-users');

// Helper function to verify Creem payment signature
const verifyCreemSignature = (params, apiKey) => {
	const { signature, ...rest } = params;
	// Build data string in the order: request_id, checkout_id, order_id, customer_id, subscription_id, product_id, salt
	// Only include parameters that have values
	const orderedParams = [
		'request_id',
		'checkout_id',
		'order_id',
		'customer_id',
		'subscription_id',
		'product_id'
	];
	
	const data = orderedParams
		.filter(key => rest[key]) // Only include parameters with values
		.map(key => `${key}=${rest[key]}`)
		.concat(`salt=${apiKey}`)
		.join('|');
	
	const expected = crypto.createHash('sha256').update(data).digest('hex');
	console.log('Data to hash:', data);
	console.log('Expected signature:', expected);
	console.log('Received signature:', signature);
	return expected === signature;
};

exports.main = async (event, context) => {
	// Event parameters
	const {
		action,
		uid,
		type,
		originalInviterUserId
	} = event;

	// Response object
	let response = {
		success: false,
		data: null,
		message: ''
	};

	try {
		// Check if uid is provided
		if (!uid) {
			throw new Error('User ID is required');
		}

		// Query user data
		const userData = await usersCollection.where({
			_id: uid
		}).get();

		// Check if user exists
		if (!userData.data || userData.data.length === 0) {
			throw new Error('User not found');
		}

		const user = userData.data[0];
		const currentTime = new Date();

		switch (action) {
			case 'checkMembership':
				// Check pro membership with expiration
				let isProMember = false;
				let proExpirationTime = null;
				
				if (user.isProMembership === true && user.proMembershipExpirationTime) {
					proExpirationTime = user.proMembershipExpirationTime;
					isProMember = proExpirationTime > currentTime.getTime();
					
					// If pro membership has expired, update the user record
					if (!isProMember) {
						await usersCollection.doc(uid).update({
							isProMembership: false,
							proMembershipExpirationTime: null
						});
					}
				}
				
				// Check lifetime membership (no expiration)
				const isLifetimeMember = user.isLifetimeMembership === true;
				const hasMembership = isProMember || isLifetimeMember;

				response = {
					success: true,
					data: {
						hasMembership: hasMembership,
						isProMembership: isProMember,
						isLifetimeMembership: isLifetimeMember,
						proMembershipExpirationTime: proExpirationTime,
						daysUntilExpiration: proExpirationTime ? Math.ceil((proExpirationTime - currentTime.getTime()) / (1000 * 60 * 60 * 24)) : null
					},
					message: hasMembership ? 'User has active membership' : 'User does not have active membership'
				};
				break;

			case 'checkFreeUsage':
				// First check if user has membership
				let hasActiveMembership = false;
				
				// Check pro membership with expiration
				if (user.isProMembership === true && user.proMembershipExpirationTime) {
					hasActiveMembership = user.proMembershipExpirationTime > currentTime.getTime();
				}
				
				// Check lifetime membership
				if (!hasActiveMembership) {
					hasActiveMembership = user.isLifetimeMembership === true;
				}

				// If user has membership, return true without checking free limits
				if (hasActiveMembership) {
					response = {
						success: true,
						data: {
							allowed: true,
							reason: 'membership',
							hasMembership: true
						},
						message: 'User has active membership, usage allowed'
					};
					break;
				}

				// If no membership, check free usage limits based on type
				if (type === 0) {
					// Check free UI generation usage (max 10 times)
					const currentUsage = user.freeUIGenerationUseTimes || 0;
					
					if (currentUsage < 10) {
						// Increment usage count
						await usersCollection.doc(uid).update({
							freeUIGenerationUseTimes: currentUsage + 1
						});
						
						response = {
							success: true,
							data: {
								allowed: true,
								reason: 'free_ui_generation',
								hasMembership: false,
								remainingUsage: 9 - currentUsage
							},
							message: 'Free UI generation usage allowed'
						};
					} else {
						// Increment usage count
						await usersCollection.doc(uid).update({
							freeUIGenerationUseTimes: currentUsage + 1
						});
						response = {
							success: true,
							data: {
								allowed: false,
								reason: 'free_ui_generation_limit_exceeded',
								hasMembership: false,
								remainingUsage: 0
							},
							message: 'Free UI generation limit exceeded (10/10)'
						};
					}
				} else if (type === 1) {
					// Check free screenshot conversion usage (max 3 times)
					const currentUsage = user.freeScreenshotConvertionUseTimes || 0;
					
					if (currentUsage < 3) {
						// Increment usage count
						await usersCollection.doc(uid).update({
							freeScreenshotConvertionUseTimes: currentUsage + 1
						});
						
						response = {
							success: true,
							data: {
								allowed: true,
								reason: 'free_screenshot_conversion',
								hasMembership: false,
								remainingUsage: 2 - currentUsage
							},
							message: 'Free screenshot conversion usage allowed'
						};
					} else {
						// Increment usage count
						await usersCollection.doc(uid).update({
							freeScreenshotConvertionUseTimes: currentUsage + 1
						});
						response = {
							success: true,
							data: {
								allowed: false,
								reason: 'free_screenshot_conversion_limit_exceeded',
								hasMembership: false,
								remainingUsage: 0
							},
							message: 'Free screenshot conversion limit exceeded (3/3)'
						};
					}
				} else {
					throw new Error('Invalid type parameter. Use 0 for UI generation or 1 for screenshot conversion');
				}
				break;

			case 'validateInvitationCode':
				// Check if originalInviterUserId is provided
				if (!originalInviterUserId) {
					throw new Error('Original inviter user ID is required');
				}

				// Query the inviter user data
				const inviterData = await usersCollection.where({
					_id: originalInviterUserId
				}).get();

				// Check if inviter exists
				if (!inviterData.data || inviterData.data.length === 0) {
					response = {
						success: false,
						data: {
							isValid: false,
							reason: 'inviter_not_found'
						},
						message: 'Invalid invitation code. The inviter does not exist.'
					};
					break;
				}

				const inviter = inviterData.data[0];
				
				// Check if user is trying to use their own invitation code
				if (originalInviterUserId === uid) {
					response = {
						success: false,
						data: {
							isValid: false,
							reason: 'self_invitation'
						},
						message: 'You cannot use your own invitation code.'
					};
					break;
				}

				// Increment the inviter's inviteMemberTimes
				const currentInviteTimes = inviter.inviteMemberTimes || 0;
				await usersCollection.doc(originalInviterUserId).update({
					inviteMemberTimes: currentInviteTimes + 1
				});

				// Give the user who applied the invitation code 1 month free pro membership
				const oneMonthFromNow = currentTime.getTime() + (30 * 24 * 60 * 60 * 1000);
				await usersCollection.doc(uid).update({
					isProMembership: true,
					proMembershipExpirationTime: oneMonthFromNow
				});

				// Check if inviter should get membership benefits
				let membershipBenefit = null;
				if (currentInviteTimes + 1 === 1) {
					// First invite - give 1 month free pro membership
					await usersCollection.doc(originalInviterUserId).update({
						isProMembership: true,
						proMembershipExpirationTime: oneMonthFromNow
					});
					membershipBenefit = '1_month_pro';
				} else if (currentInviteTimes + 1 === 4) {
					// Fourth invite - give lifetime membership
					await usersCollection.doc(originalInviterUserId).update({
						isLifetimeMembership: true
					});
					membershipBenefit = 'lifetime';
				}

				response = {
					success: true,
					data: {
						isValid: true,
						inviterUserId: originalInviterUserId,
						inviteCount: currentInviteTimes + 1,
						membershipBenefit: membershipBenefit,
						userMembershipBenefit: '1_month_pro'
					},
					message: 'Invitation code validated successfully! You have received 1 month of free Pro membership!'
				};
				break;

		case 'verifyCreemSignature':
			// Verify Creem payment return URL signature
			const {
				checkout_id,
				order_id,
				customer_id,
				subscription_id,
				product_id,
				request_id,
				signature
			} = event;

			// Check if all required parameters are provided
			if (!signature) {
				throw new Error('Signature is required for verification');
			}

			// Creem API key
			const creemApiKey = 'creem_test_6DPe18CbuavdjNsshNtzI9';

			// Prepare params for signature verification
			const paramsToVerify = {
				checkout_id: checkout_id || '',
				order_id: order_id || '',
				customer_id: customer_id || '',
				subscription_id: subscription_id || '',
				product_id: product_id || '',
				request_id: request_id || '',
				signature: signature
			};

			// Verify the signature
			const isSignatureValid = verifyCreemSignature(paramsToVerify, creemApiKey);

			if (!isSignatureValid) {
				response = {
					success: false,
					data: {
						isValid: false,
						reason: 'invalid_signature'
					},
					message: 'Payment signature verification failed. The payment may be fraudulent.'
				};
				break;
			}

			// If signature is valid and uid is provided, update user membership
			if (uid) {
				// Determine membership type based on product_id
				const isLifetime = product_id === 'prod_7m7FLqGesIUZD6MstjzOLR';
				
				if (isLifetime) {
					// Grant lifetime membership
					await usersCollection.doc(uid).update({
						isLifetimeMembership: true,
						lastPaymentCheckoutId: checkout_id,
						lastPaymentOrderId: order_id,
						lastPaymentDate: new Date().getTime()
					});
				} else {
					// Grant 1-month pro membership (30 days)
					const oneMonthFromNow = currentTime.getTime() + (30 * 24 * 60 * 60 * 1000);
					await usersCollection.doc(uid).update({
						isProMembership: true,
						proMembershipExpirationTime: oneMonthFromNow,
						lastPaymentCheckoutId: checkout_id,
						lastPaymentOrderId: order_id,
						lastPaymentDate: new Date().getTime()
					});
				}
			}

			response = {
				success: true,
				data: {
					isValid: true,
					checkout_id: checkout_id,
					order_id: order_id,
					customer_id: customer_id,
					subscription_id: subscription_id,
					product_id: product_id,
					membershipGranted: uid ? true : false
				},
				message: 'Payment signature verified successfully!'
			};
			break;

		default:
			throw new Error('Invalid action. Use "checkMembership", "checkFreeUsage", "validateInvitationCode", or "verifyCreemSignature"');
		}

	} catch (error) {
		response = {
			success: false,
			data: null,
			message: error.message || 'An error occurred while processing the request'
		};
	}

	return response;
};
