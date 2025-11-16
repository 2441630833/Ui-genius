'use strict';
const db = uniCloud.database();
const collection = db.collection('uni-id-users');
const crypto = require('crypto');

// Function to hash password
function hashPassword(password) {
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
	return { salt, hash };
}

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event);
	
	try {
		const { action, userId, data } = event;
		
		if (!userId) {
			return {
				success: false,
				message: 'User ID is required'
			};
		}
		
		// Check if user exists
		const userRecord = await collection.doc(userId).get();
		if (!userRecord.data || userRecord.data.length === 0) {
			return {
				success: false,
				message: 'User not found'
			};
		}
		
		// Handle different update actions
		switch (action) {
			case 'updateProfile':
				// Update profile information
				if (!data || !data.firstName || !data.lastName) {
					return {
						success: false,
						message: 'First name and last name are required'
					};
				}
				
				const profileResult = await collection.doc(userId).update({
					nickname: data.firstName + ' ' + data.lastName,
					first_name: data.firstName,
					last_name: data.lastName
				});
				
				return {
					success: true,
					message: 'Profile updated successfully',
					data: profileResult
				};
				
			case 'updateEmail':
				// Update email
				if (!data || !data.email) {
					return {
						success: false,
						message: 'Email is required'
					};
				}
				
				// Check if email is already in use by another user
				const emailCheck = await collection.where({
					email: data.email,
					_id: { $ne: userId } // Not equal to current user
				}).get();
				
				if (emailCheck.data && emailCheck.data.length > 0) {
					return {
						success: false,
						message: 'Email is already in use'
					};
				}
				
				const emailResult = await collection.doc(userId).update({
					email: data.email
				});
				
				return {
					success: true,
					message: 'Email updated successfully',
					data: emailResult
				};
				
			case 'updatePassword':
				// Update password
				if (!data || !data.password) {
					return {
						success: false,
						message: 'Password is required'
					};
				}
				
				// Hash the password before storing
				const { salt, hash } = hashPassword(data.password);
				
				const passwordResult = await collection.doc(userId).update({
					password_hash: hash,
					password_salt: salt
				});
				
				return {
					success: true,
					message: 'Password updated successfully',
					data: passwordResult
				};
				
			case 'updateProfilePhoto':
				// Update profile photo
				if (!data || !data.photoUrl) {
					return {
						success: false,
						message: 'Photo URL is required'
					};
				}
				
				const photoResult = await collection.doc(userId).update({
					avatar: data.photoUrl
				});
				
				return {
					success: true,
					message: 'Profile photo updated successfully',
					data: photoResult
				};
				
			default:
				return {
					success: false,
					message: 'Invalid action'
				};
		}
	} catch (error) {
		console.error('Error updating user info:', error);
		return {
			success: false,
			message: error.message || 'An error occurred while updating user information'
		};
	}
};
