# User Project Cloud Function

This cloud function provides CRUD (Create, Read, Update, Delete) operations for the `user-create-project` collection.

## Usage

Call this cloud function with the appropriate action and parameters:

### Create a new project

```javascript
uniCloud.callFunction({
  name: 'user-project',
  data: {
    action: 'create',
    data: {
      email: 'user@example.com',
      projectTitle: 'My New Project',
      projectDescription: 'This is a description of my project',
      generated_overall_pages: {} // Your JSON data for pages
    }
  }
}).then(res => {
  console.log(res.result);
});
```

### Read projects

Read all projects:
```javascript
uniCloud.callFunction({
  name: 'user-project',
  data: {
    action: 'read'
  }
}).then(res => {
  console.log(res.result);
});
```

Read projects by email:
```javascript
uniCloud.callFunction({
  name: 'user-project',
  data: {
    action: 'read',
    data: {
      email: 'user@example.com'
    }
  }
}).then(res => {
  console.log(res.result);
});
```

Read a specific project by ID:
```javascript
uniCloud.callFunction({
  name: 'user-project',
  data: {
    action: 'read',
    id: 'project_id_here'
  }
}).then(res => {
  console.log(res.result);
});
```

### Update a project

```javascript
uniCloud.callFunction({
  name: 'user-project',
  data: {
    action: 'update',
    id: 'project_id_here',
    data: {
      projectTitle: 'Updated Project Title',
      projectDescription: 'Updated project description'
    }
  }
}).then(res => {
  console.log(res.result);
});
```

### Delete a project

```javascript
uniCloud.callFunction({
  name: 'user-project',
  data: {
    action: 'delete',
    id: 'project_id_here'
  }
}).then(res => {
  console.log(res.result);
});
```

## Response Format

All operations return a response with the following structure:

```javascript
{
  success: true/false,  // Whether the operation was successful
  data: {},            // The data returned (if any)
  message: ''          // A message describing the result
}
``` 