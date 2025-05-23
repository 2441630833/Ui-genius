# UI Genius Backend API

This is a FastAPI backend for the UI Genius application that integrates with the DashScope AI API.

To get started:

1. Create and activate your conda environment:
   ```
   conda env create -f environment.yml
   conda activate ui-genius-api
   ```

2. Set up your environment variables:
   ```
   python env_setup.py
   ```
   This script will interactively create your .env file with your API key.

3. Run the API:
   ```
   python run.py
   ``` 
   
4、Update the environment:
   ```
   conda env update -f environment.yml
   ``` 
## Running the Server

Run the server with:
```
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Endpoints

### 1. Root Endpoint
- **URL**: `/`
- **Method**: `GET`
- **Description**: Welcome message

### 2. Text Chat
- **URL**: `/api/chat`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "text": "Your text prompt here",
    "system_prompt": "Optional system prompt"
  }
  ```

### 3. Image Analysis
- **URL**: `/api/analyze-image`
- **Method**: `POST`
- **Form Data**:
  - `file`: Image file (optional)
  - `image_url`: URL to image (optional)
  - `prompt`: Text prompt for image analysis
  - `system_prompt`: Optional system prompt

## Notes

- Either `file` or `image_url` must be provided for the image analysis endpoint
- The API uses the DashScope API compatible with OpenAI client 