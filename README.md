# UI Genius

UI Genius is a powerful UI design and code generation tool that allows you to create beautiful user interfaces and export them to various frameworks.

## Features

- Generate UI designs from text descriptions
- Edit and customize generated designs
- Export designs to different frameworks (Vue 2, Vue 3, React)
- Export designs as HTML or image files
- Apply custom theme colors

## Code Export Feature

UI Genius allows you to export your designs to different frameworks:

1. **Vue 2**: Export your design as Vue 2 components with proper structure and dependencies
2. **Vue 3**: Export your design as Vue 3 components with composition API
3. **React**: Export your design as React components with JSX

The exported code includes:
- Independent component files for each page
- Main application file with routing
- Proper project structure
- Package.json with dependencies
- README.md with project information

## Project Structure

```
latest_7_overall_page
{
  "pages": [
    {
      "name": "Home",
      "component": "<div class='home-page'><h1>Welcome to our site</h1><p>This is the homepage content</p></div>"
    },
    {
      "name": "About",
      "component": "<section class='about-section'><h2>About Us</h2><p>Learn more about our company</p></section>"
    }
  ],
  "AIProjectDescription": "A simple website project with multiple pages and components",
  "AIProjectName": "MultiPage Website"
}
```

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Open your browser to the local development URL

## Backend API

The backend API provides endpoints for:
- Generating UI designs
- Exporting code to different frameworks
- Updating theme colors

{"pages":[{"name":"Simple Page","component":"<!-- HTML/CSS code --> <!DOCTYPE html> <html lang=\"en\"> <head> <meta charset=\"UTF-8\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> <title>Simple Page</title> <!-- Tailwind CSS --> <link href=\"https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css\" rel=\"stylesheet\"> </head> <body class=\"flex items-center justify-center h-screen bg-gray-100 text-black font-sans\"> <!-- Heading --> <h1 class=\"text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl\">Welcome to My Simple Page</h1> </body> </html>"}],"AIProjectDescription":"My Project","AIProjectName":"UI Genius Project"}
​
<prototype>: Object { … }
design.vue:2920:1
123bcbfeqqaeabfaf5a is the skip login user uid, need to add the local verify
