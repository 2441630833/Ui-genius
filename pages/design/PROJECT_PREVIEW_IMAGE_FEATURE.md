# Project Preview Image Feature Documentation

## Feature Overview

Each user-created project now uses its first generated page as the project display image, instead of using a fixed default image.

## Implementation Details

### 1. Database Schema Update

Added new field to the `user-create-project` collection:
- `projectPreviewImage`: Stores the project preview image as a base64 encoded string

### 2. Cloud Function Modifications (`uniCloud-aliyun/cloudfunctions/user-project/index.js`)

#### Create Project (create)
- Saves the `projectPreviewImage` field when creating a project

#### Update Project (update)
- Supports updating the `projectPreviewImage` field
- Can update the preview image when project content is updated

### 3. Design Page Modifications (`pages/design/design.vue`)

#### Enhanced `saveProjectToCloud` Method
- Automatically retrieves the preview image from the project's first page
- Saves the preview image to the database when saving the project
- Uses page screenshots already generated in localStorage

#### New `updateProjectPreviewIfNeeded` Method
- Listens for page screenshot generation events
- Automatically updates the project preview image when the first page's screenshot is completed
- Updates the cloud database in real-time

#### New `updateImportedProjectPreview` Method
- Specifically handles preview images for projects imported via share links
- Updates the imported project's preview image after preview images are generated
- Includes retry mechanism that automatically retries if preview image hasn't been generated yet
- Ensures imported projects also display correct preview images

### 4. Dashboard Page Modifications (`pages/dashboard/dashboard.vue`)

#### Project Card Display
- Modified project card image source to prioritize using `project.projectPreviewImage`
- Falls back to default image if no preview image exists
- Code example:
```vue
<image class="project-image"
  :src="project.projectPreviewImage || 'https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Image(3).png'"
  mode="aspectFill">
</image>
```

## Workflow

### Scenario 1: User Creates New Project

1. **User Creates Project**
   - Click "Create Project" on Dashboard
   - Enter project description and generate UI
   
2. **Page Generation and Screenshots**
   - AI generates multiple pages
   - System automatically generates preview screenshots for each page
   - Screenshots stored in localStorage (key: `uigenius_image_[pageName]`)

3. **Automatic Preview Image Setup**
   - When the first page's screenshot is completed
   - `updateProjectPreviewIfNeeded` method is triggered
   - Automatically sets the first page's screenshot as the project preview image
   - Updates cloud database

4. **Dashboard Display**
   - User returns to Dashboard
   - System loads all user projects
   - Each project card displays its unique preview image
   - Preview image comes from the project's first page

### Scenario 2: Import Project via Share Link

1. **User Accesses Share Link**
   - User clicks on another user's shared project link
   - URL contains project ID (e.g., `?pid=xxx`)

2. **Project Import and Copy**
   - System loads shared project data from cloud
   - Creates a new project copy under current user's account
   - Project title set to "Shared project from other users"
   - Project description includes import timestamp

3. **Generate Preview Images**
   - System loads all project pages
   - Automatically generates preview screenshots for each page
   - Calls `updateImportedProjectPreview` method after 2 seconds

4. **Update Preview Image**
   - `updateImportedProjectPreview` method checks for first page's screenshot
   - If screenshot not generated, retries after 1 second
   - Sets the first page's screenshot as the project preview image
   - Updates cloud database

5. **Dashboard Display**
   - Imported project displays on Dashboard
   - Uses the first page's screenshot as preview image

## Advantages

1. **Personalization**: Each project has a unique preview image instead of identical placeholders
2. **Automation**: No manual user action required, system handles everything automatically
3. **Consistency**: Preview images stay consistent with actual project content
4. **Real-time Updates**: Preview images automatically update when project content changes

## Considerations

1. Preview images are stored as base64 encoding, which may consume considerable storage space for large projects
2. If first page screenshot generation fails, project will use default placeholder image
3. Preview images update automatically after page screenshots are generated, no additional action needed

## Future Optimization Suggestions

1. Consider uploading base64 images to cloud storage service and only save URLs
2. Allow users to manually select which page to use as preview image
3. Support user-uploaded custom project preview images
4. Compress preview images to reduce storage space usage
