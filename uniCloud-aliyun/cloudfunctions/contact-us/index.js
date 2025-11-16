'use strict';
const db = uniCloud.database()
const collection = db.collection('contact-us')
exports.main = async (event, context) => {
	// Basic input extraction
	const name = (event && event.name || '').trim()
	const email = (event && event.email || '').trim()
	const subject = (event && event.subject || '').trim()
	const message = (event && event.message || '').trim()

	// Basic validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	if (!name || !email || !subject || !message) {
		return { code: 1001, msg: 'Please provide name, email, subject, and message.' }
	}
	if (!emailRegex.test(email)) {
		return { code: 1002, msg: 'Invalid email format.' }
	}
	if (name.length > 100) {
		return { code: 1003, msg: 'Name is too long.' }
	}
	if (subject.length > 200) {
		return { code: 1004, msg: 'Subject is too long.' }
	}
	if (message.length > 5000) {
		return { code: 1005, msg: 'Message is too long.' }
	}

	// Persist to database
	try {
		await collection.add({
			name,
			email,
			subject,
			message,
			clientIp: (context && context.CLIENTIP) || '',
			userAgent: (context && context.CLIENTUA) || '',
			createdAt: Date.now()
		})

		return { code: 0, msg: 'Message received. Thank you!' }
	} catch (err) {
		console.error('Failed to save contact message:', err)
		return { code: 2001, msg: 'Failed to process your request. Please try again later.' }
	}
};
