# Delete Project Feature Implementation Documentation (with Multi-Select)

## Overview
Added "Delete Projects" functionality in the Dashboard page sidebar, allowing users to select and delete specific projects. Supports both single deletion and multi-select batch deletion. Delete operations will simultaneously remove data from both database collections.

## Frontend Implementation (dashboard.vue)

### 1. Added Delete Navigation Item in Sidebar
Added a new navigation item "Delete Projects" in the sidebar with delete icon:
- Location: After the Guide navigation item
- Icon: Uses `delete.png` and `delete_white.png`
- Switches to delete project view when clicked

### 2. Delete Projects Interface
Added main interface for deleting projects, including:
- **Top Action Bar**:
  - **Select All / Deselect All Button**: Select/deselect all projects
  - **Delete Selected Button**: Batch delete selected projects, displays count of selected items
- **Loading State**: Shows "Loading projects..."
- **Empty State**: Shows "No projects found" when no projects exist
- **Project List**: Displays all user projects, each project contains:
  - Checkbox (clickable to select/deselect)
  - Project Title (projectTitle)
  - Project Description (projectDescription)
  - Individual Delete Button

### 3. Delete Confirmation Dialog
After clicking delete button, a confirmation dialog appears with different content based on delete type:

**Single Project Delete**:
- Warning message: "Are you sure you want to delete this project? This action cannot be undone."
- Project information to be deleted is highlighted

**Batch Delete**:
- Warning message: "Are you sure you want to delete X project(s)? This action cannot be undone."
- Scrollable project list showing all projects to be deleted

**Action Buttons**:
- **Cancel**: Cancel deletion
- **Delete**: Confirm deletion (with loading state, shows "Deleting...")

### 4. Data State Management
Added data fields:
```javascript
{
  deleteProjectsLoading: false,    // Loading state for project list
  showDeleteDialog: false,          // Show/hide delete confirmation dialog
  projectToDelete: null,            // Single project object to delete
  isDeletingProject: false,         // Deleting project state
  selectedProjects: [],             // Array of selected project IDs
  isMultipleDelete: false,          // Flag for batch delete
  projectsToDelete: [],             // Array of projects to delete
}
```

### 5. Method Implementation

#### confirmDeleteProject(project)
- Set single project delete mode
- Save project information to be deleted to projectsToDelete array
- Open delete confirmation dialog

#### confirmDeleteSelectedProjects()
- Check if there are selected projects
- Filter project objects to be deleted based on selectedProjects array
- Set batch delete mode flag
- Open delete confirmation dialog

#### closeDeleteDialog()
- Close delete confirmation dialog
- Clear all project information to be deleted
- Reset delete-related state flags

#### deleteProjects()
- Unified delete method supporting both single and batch deletion
- Calls cloud function `user-project` to delete each project in loop
- During deletion:
  - Display loading progress
  - Record success and failure counts
  - Remove successfully deleted projects from local array
  - Check and clean current project cache
- After deletion:
  - Clear selection state
  - Display result statistics
  - Close dialog

#### toggleProjectSelection(projectId)
- Toggle project selection state
- If already selected, deselect; if not selected, add to selectedProjects array

#### isProjectSelected(projectId)
- Check if project is selected
- Returns boolean value

#### toggleSelectAll()
- Select all / deselect all functionality
- If all selected, clear selection
- Otherwise select all projects

### 6. Style Design
Added styles include:
- **Top Action Bar Styles**: 
  - Select All button: Gray background, darker on hover
  - Delete Selected button: Red background, semi-transparent when disabled
- **Checkbox Styles**: 
  - Unchecked: Gray border
  - Checked: Red background, white checkmark
  - Smooth transition animation
- **Project Card Styles**: 
  - Default: Gray background
  - Hover: White background, shadow effect
  - Selected: Pink background, red border
  - Click area covers entire card
- **Delete Button Styles**: Red warning button, prevents event bubbling
- **Delete Dialog Styles**: 
  - Centered display with shadow
  - Scrollable list for multiple project deletion (max height 300px)
- **Project Info Highlight Styles**: Pink background, text truncation

## Backend Implementation (user-project/index.js)

### Modified delete case
The original delete logic only deleted data from `user-create-project` collection, now changed to:

1. **First delete data from generated-overall-pages collection**
   ```javascript
   const deleteGeneralPagesResult = await generalPageCollection.where({
     user_create_project_id: id
   }).remove();
   ```
   - Use `user_create_project_id` field to match project ID
   - Delete all generated page data for this project

2. **Then delete data from user-create-project collection**
   ```javascript
   const deleteResult = await collection.doc(id).remove();
   ```
   - Use `_id` field to directly delete project record

3. **Return complete deletion result**
   ```javascript
   response = {
     success: true,
     data: {
       projectDeleted: deleteResult,
       pagesDeleted: deleteGeneralPagesResult
     },
     message: 'Project and associated pages deleted successfully'
   };
   ```

## Database Operation Logic

### Data Relationships
- `user-create-project` collection: Stores basic project information
  - `_id`: Project unique identifier
  - `uid`: User ID
  - `projectTitle`: Project title
  - `projectDescription`: Project description

- `generated-overall-pages` collection: Stores project generated pages
  - `user_create_project_id`: Links to _id of user-create-project
  - `generated_overall_pages`: Generated page data

### Delete Flow
1. Receive project ID from frontend (projectId = project._id)
2. Find and delete records in `generated-overall-pages` collection where `user_create_project_id` equals this ID
3. Delete record in `user-create-project` collection where `_id` equals this ID
4. Return results of both delete operations

## User Experience Optimization

1. **Loading State**: Display loading prompt during deletion
2. **Confirmation Mechanism**: Prevent accidental deletion, requires user double confirmation
3. **Visual Feedback**:
   - Project card hover effect
   - Delete button hover color change
   - Success/failure toast notifications
4. **Local Cache Cleanup**: If deleted project is current project, automatically clean related cache
5. **Real-time Update**: Immediately remove from list after successful deletion, no page refresh needed

## Security Considerations

1. **Frontend Validation**:
   - Check if project exists
   - Prevent duplicate submission (isDeletingProject flag)
   
2. **Backend Validation**:
   - Check if ID is provided
   - Use try-catch to capture errors
   - Return detailed error information

3. **Data Consistency**:
   - First delete associated data (generated-overall-pages)
   - Then delete main data (user-create-project)
   - Ensure data synchronization deletion across both collections

## Usage Flow

### Single Delete Flow
1. User clicks "Delete Projects" in sidebar
2. System displays all user projects list
3. User clicks "Delete" button on project to be deleted
4. Confirmation dialog appears showing project details
5. User clicks "Delete" to confirm deletion
6. System calls cloud function to execute delete operation
7. After successful deletion, notification appears and project disappears from list
8. If deleted project is current project, clear related cache

### Batch Delete Flow
1. User clicks "Delete Projects" in sidebar
2. System displays all user projects list
3. User selects projects through:
   - Click project card (including checkbox area) to select/deselect individual items
   - Click "Select All" button to select all
   - Click again to "Deselect All" to cancel all selections
4. After selecting projects, card displays red border and pink background
5. Click "Delete Selected (X)" button, X is the selected count
6. Confirmation dialog appears showing all projects to be deleted
7. User clicks "Delete" to confirm batch deletion
8. System sequentially calls cloud function to delete each project
9. Display deletion result statistics (success/failure counts)
10. Automatically clear selection state

## Testing Recommendations

### Basic Function Tests
1. **Single Delete Test**: Delete normal project, verify data in both collections are deleted from database
2. **Current Project Delete Test**: Delete currently open project, verify cache is properly cleaned
3. **Empty List Test**: Verify display when no projects exist
4. **Network Error Test**: Simulate network error, verify error notification
5. **Concurrent Delete Test**: Rapidly click multiple delete buttons, verify duplicate submission prevention

### Multi-Select Function Tests
6. **Single Select Test**: Click project card, verify checkbox state and visual feedback
7. **Select All Test**: Click "Select All", verify all projects are selected
8. **Deselect All Test**: After select all, click button again, verify all deselected
9. **Partial Selection Test**: Select some projects, verify button displays correct count
10. **Batch Delete Test**: Select multiple projects for deletion, verify all selected projects are deleted
11. **Mixed Delete Test**: After selecting projects, use individual delete button, verify doesn't affect selection state
12. **Post-Delete State Test**: After batch delete, verify selection state is cleared
13. **Partial Failure Test**: Simulate partial project deletion failure, verify success/failure statistics are correct
14. **Large Batch Test**: Select large number of projects for deletion, verify performance and UI responsiveness
15. **Cancel Operation Test**: Click cancel in confirmation dialog, verify no deletion and selection state maintained

