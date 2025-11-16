'use strict';
const db = uniCloud.database();
const generalPageCollection = db.collection('generated-overall-pages');
exports.main = async (event, context) => {
	// Event parameters
	const {
		action,
		id
	} = event;

	// Response object
	let response = {
		success: false,
		data: null,
		message: ''
	};

	try {
		switch (action) {
			case 'read':
				if (!id) {
					throw new Error('ID is required');
				}
				const pagesData = await generalPageCollection.where({
					user_create_project_id: id
				}).get();
				console.log(pagesData.data[0].generated_overall_pages)
				response = {
					success: true,
					data: pagesData.data[0].generated_overall_pages,
					message: 'Project retrieved successfully'
				};
				break;
		}
	} catch (error) {
		response = {
			success: false,
			data: null,
			message: error.message || 'An error occurred'
		};
	}

	return response;
}