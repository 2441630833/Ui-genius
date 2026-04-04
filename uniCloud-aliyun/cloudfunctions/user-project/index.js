'use strict';

const db = uniCloud.database();
const collection = db.collection('user-create-project');
const generalPageCollection = db.collection('generated-overall-pages');

exports.main = async (event, context) => {
	// Event parameters
	const {
		action,
		data = {},
		id,
		projectIds,
		uid
	} = event;

	// Response object
	let response = {
		success: false,
		data: null,
		message: ''
	};

	try {
		switch (action) {
			case 'create':
				// console.log("testDataCheckForGoogle",data)
				const projectInfo = {
					uid: data.uid,
					email: data.email,
					projectTitle: data.projectTitle,
					projectDescription: data.projectDescription,
					projectPreviewImage: data.projectPreviewImage || '', // Add preview image field
				}

				// Create a new project
				const createResult = await collection.add(projectInfo);
				// console.log("createResult", createResult)
				const generalPages = {
					user_create_project_id: createResult.id,
					generated_overall_pages: data.generated_overall_pages
				}
				const generalPageRes = await generalPageCollection.add(generalPages)
				response = {
					success: true,
					project_id: generalPages.user_create_project_id,
					data: generalPageRes,
					message: 'Project created successfully'
				};
				// console.log(response)
				break;

			case 'read':
				if (id) {
					// Read a specific project by user uid
					const project = await collection.where({
						uid: id
					}).get();
					response = {
						success: true,
						data: project.data,
						message: 'Project retrieved successfully'
					};
				} else {
					// Read all projects or filter by provided data
					let query = collection;

					// Apply filters if any exist in data
					if (data.email) {
						query = query.where('email', '==', data.email);
					}

					const projects = await query.get();
					response = {
						success: true,
						data: projects.data,
						message: 'Projects retrieved successfully'
					};
				}
				break;

			case 'readUidByProjectId':
				// Read user UID by project ID
				if (id) {
					// Get the project by project ID
					const project = await collection.doc(id).get();
					if (project.data && project.data.length > 0) {
						const uid = project.data[0].uid;
						response = {
							success: true,
							data: {
								uid: uid
							},
							message: 'User UID retrieved successfully'
						};
					} else {
						response = {
							success: false,
							data: null,
							message: 'Project not found'
						};
					}
				} else {
					response = {
						success: false,
						data: null,
						message: 'Project ID is required for readUidByProjectId operation'
					};
				}
				break;

			case 'readThemeColour':
				if (id) {
					// Read theme color for a specific project by ID
					const result = await collection.doc(id).field({ themeColour: true }).get();
					const themeColour = result.data[0].themeColour;
					// console.log(result,"result")
					// console.log(themeColour,"themeColour")
					if (result) {
						response = {
							success: true,
							data: {
								themeColour: themeColour
							},
							message: 'Theme color retrieved successfully'
						};
					} else {
						response = {
							success: false,
							data: null,
							message: 'Project not found'
						};
					}
				} else {
					response = {
						success: false,
						data: null,
						message: 'Project ID is required for readThemeColour operation'
					};
				}
				break;

			case 'update':
				// console.log(data)
				// Update generated pages if provided
				if (data.generated_overall_pages) {
					const generalPagesUpdateData = {
						generated_overall_pages: data.generated_overall_pages
					};

					await generalPageCollection.where({
						user_create_project_id: data.currentProjectId
					}).update(generalPagesUpdateData);
				}

				// Update project preview image, theme color, and share status if provided
				const projectUpdateData = {};
				if (data.projectPreviewImage !== undefined) {
					projectUpdateData.projectPreviewImage = data.projectPreviewImage;
				}
				if (data.themeColour !== undefined) {
					projectUpdateData.themeColour = data.themeColour;
				}
				if (data.ifSharedProject !== undefined) {
					projectUpdateData.ifSharedProject = data.ifSharedProject;
				}
				console.log(projectUpdateData)

				if (Object.keys(projectUpdateData).length > 0) {
					await collection.doc(id).update(projectUpdateData);
				}

				response = {
					success: true,
					project_id: id,
					message: 'Project updated successfully'
				};
				break;

			case 'shareProjectUpdateUidArray':
				// Share project by adding user UID to shareProjectUidArray
				if (!id) {
					throw new Error('Project ID is required for shareProject operation');
				}
				if (!data.shareUid) {
					throw new Error('User UID is required for shareProject operation');
				}

				// Get the current project to check existing shareProjectUidArray
				const projectResult = await collection.doc(id).get();
				if (!projectResult.data || projectResult.data.length === 0) {
					throw new Error('Project not found');
				}

				const project = projectResult.data[0];
				let shareProjectUidArray = project.shareProjectUidArray || [];

				// Check if UID already exists in array to avoid duplicates
				if (!shareProjectUidArray.includes(data.shareUid)) {
					shareProjectUidArray.push(data.shareUid);
				}

				// Update the project with the new shareProjectUidArray
				await collection.doc(id).update({
					shareProjectUidArray: shareProjectUidArray
				});

				response = {
					success: true,
					project_id: id,
					data: {
						shareProjectUidArray: shareProjectUidArray
					},
					message: 'Project shared successfully'
				};
				break;
			
			
			case 'readSharedProjects':
				// Read projects where the user's UID exists in shareProjectUidArray
				if (!data.uid) {
					throw new Error('User UID is required for readSharedProjects operation');
				}
				// Query projects where shareProjectUidArray contains the user's UID
				const sharedProjects = await collection.where({
					shareProjectUidArray: db.command.elemMatch(db.command.eq(data.uid))
				}).get();
				response = {
					success: true,
					data: sharedProjects.data,
					message: 'Shared projects retrieved successfully'
				};
				break;

			case 'readSharedProject':
				// Read all projects where ifSharedProject equals true
				const sharedProjectsQuery = await collection.where({
					ifSharedProject: true
				}).get();
				response = {
					success: true,
					data: sharedProjectsQuery.data,
					message: 'Shared projects retrieved successfully'
				};
				break;

			case 'delete':
				// Delete a project by ID
				if (!id) {
					throw new Error('ID is required for delete operation');
				}
				if (!uid) {
					throw new Error('User UID is required for delete operation');
				}

				// Get the project to verify ownership
				const projectToDelete = await collection.doc(id).get();
				if (!projectToDelete.data || projectToDelete.data.length === 0) {
					throw new Error('Project not found');
				}

				const projectData = projectToDelete.data[0];
				
				// Check if the user is the project owner
				if (projectData.uid === uid) {
					// User is the owner, delete the entire project
					// First, delete from generated-overall-pages collection using user_create_project_id
					const deleteGeneralPagesResult = await generalPageCollection.where({
						user_create_project_id: id
					}).remove();
				
					console.log('Deleted from generated-overall-pages:', deleteGeneralPagesResult);

					// Then, delete from user-create-project collection using _id
					const deleteResult = await collection.doc(id).remove();
				
					console.log('Deleted from user-create-project:', deleteResult);
				
					response = {
						success: true,
						data: {
							projectDeleted: deleteResult,
							pagesDeleted: deleteGeneralPagesResult
						},
						message: 'Project and associated pages deleted successfully'
					};
				} else {
					// User is not the owner, remove them from shareProjectUidArray
					let shareProjectUidArray = projectData.shareProjectUidArray || [];
					const initialLength = shareProjectUidArray.length;
				
					// Remove the user uid from the array
					shareProjectUidArray = shareProjectUidArray.filter(sharedUid => sharedUid !== uid);
				
					if (shareProjectUidArray.length < initialLength) {
						// Update the project with the modified shareProjectUidArray
						await collection.doc(id).update({
							shareProjectUidArray: shareProjectUidArray
						});
					
						response = {
							success: true,
							data: {
								shareProjectUidArray: shareProjectUidArray
							},
							message: 'User removed from shared project successfully'
						};
					} else {
						response = {
							success: false,
							data: null,
							message: 'User is not in the shared project list'
						};
					}
				}
				break;

			case 'batchDelete':
				// Batch delete multiple projects by IDs
				if (!projectIds || !Array.isArray(projectIds) || projectIds.length === 0) {
					throw new Error('projectIds array is required for batch delete operation');
				}
				if (!uid) {
					throw new Error('User UID is required for batch delete operation');
				}

				console.log('Batch deleting projects:', projectIds);

				let successCount = 0;
				let failCount = 0;
				const deleteResults = [];
				const failedProjects = [];

				// Delete each project
				for (let i = 0; i < projectIds.length; i++) {
					const projectId = projectIds[i];
					
					try {
						// Get the project to verify ownership
						const projectToDelete = await collection.doc(projectId).get();
						if (!projectToDelete.data || projectToDelete.data.length === 0) {
							throw new Error('Project not found');
						}

						const projectData = projectToDelete.data[0];
						
						// Check if the user is the project owner
						if (projectData.uid === uid) {
							// User is the owner, delete the entire project
							// Delete from generated-overall-pages collection
							const batchDeletePagesResult = await generalPageCollection.where({
								user_create_project_id: projectId
							}).remove();
							
							// Delete from user-create-project collection
							const batchDeleteProjectResult = await collection.doc(projectId).remove();
							
							successCount++;
							deleteResults.push({
								projectId: projectId,
								success: true,
								action: 'deleted',
								pagesDeleted: batchDeletePagesResult,
								projectDeleted: batchDeleteProjectResult
							});
							
							console.log(`Successfully deleted project: ${projectId}`);
						} else {
							// User is not the owner, remove them from shareProjectUidArray
							let shareProjectUidArray = projectData.shareProjectUidArray || [];
							const initialLength = shareProjectUidArray.length;
							
							// Remove the user uid from the array
							shareProjectUidArray = shareProjectUidArray.filter(sharedUid => sharedUid !== uid);
							
							if (shareProjectUidArray.length < initialLength) {
								// Update the project with the modified shareProjectUidArray
								await collection.doc(projectId).update({
									shareProjectUidArray: shareProjectUidArray
								});
								
								successCount++;
								deleteResults.push({
									projectId: projectId,
									success: true,
									action: 'removed_from_shared',
									shareProjectUidArray: shareProjectUidArray
								});
								
								console.log(`Successfully removed user from shared project: ${projectId}`);
							} else {
								throw new Error('User is not in the shared project list');
							}
						}
					} catch (error) {
						failCount++;
						failedProjects.push({
							projectId: projectId,
							error: error.message
						});
						console.error(`Failed to process project ${projectId}:`, error.message);
					}
				}

				response = {
					success: failCount === 0, // Only true if all operations succeeded
					data: {
						totalProjects: projectIds.length,
						successCount: successCount,
						failCount: failCount,
						deleteResults: deleteResults,
						failedProjects: failedProjects
					},
					message: `Batch delete completed: ${successCount} succeeded, ${failCount} failed`
				};
				
				console.log('Batch delete response:', response);
				break;

			default:
				throw new Error('Invalid action specified');
		}
	} catch (error) {
		response = {
			success: false,
			data: null,
			message: error.message
		};
	}

	return response;
};