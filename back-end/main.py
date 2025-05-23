import os
import logging
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List, Union, Set
from dotenv import load_dotenv
from openai import OpenAI
import base64
from pathlib import Path

# Load environment variables
load_dotenv()

# Configure logging
log_level = os.getenv("LOG_LEVEL", "INFO")
logging.basicConfig(
    level=getattr(logging, log_level),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("ui-genius-api")

# Initialize FastAPI app
app = FastAPI(
    title="UI Genius API",
    description="AI API for UI Genius",
    version="1.0.0",
)

# Configure CORS
cors_origins = os.getenv("CORS_ORIGINS", "*")
if cors_origins != "*":
    # If specific origins are provided, split them into a list
    origins = [origin.strip() for origin in cors_origins.split(",")]
else:
    # Otherwise use wildcard
    origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Check if API key is available
if not os.getenv("DASHSCOPE_API_KEY"):
    logger.warning("DASHSCOPE_API_KEY not found in environment variables")

# OpenAI client initialization
client = OpenAI(
    api_key=os.getenv("DASHSCOPE_API_KEY"),
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
)

class TextPrompt(BaseModel):
    text: str
    system_prompt: Optional[str] = "You are a helpful assistant."

class ImageAnalysisRequest(BaseModel):
    image_url: Optional[str] = None
    prompt: str
    system_prompt: Optional[str] = "You are a helpful assistant."

@app.get("/")
async def root():
    return {"message": "Welcome to UI Genius API", "status": "online"}

@app.post("/api/chat")
async def chat_completion(text_prompt: TextPrompt):
    try:
        logger.info(f"Processing chat request with prompt: {text_prompt.text[:50]}...")
        
        completion = client.chat.completions.create(
            model="qwen-vl-max-latest",
            messages=[
                {
                    "role": "system",
                    "content": [{"type": "text", "text": text_prompt.system_prompt}],
                },
                {
                    "role": "user",
                    "content": [{"type": "text", "text": text_prompt.text}],
                },
            ],
        )
        
        response = completion.choices[0].message.content
        logger.info(f"Chat request completed successfully. Response length: {len(response)}")
        
        return {"response": response}
    except Exception as e:
        logger.error(f"Error in chat completion: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/analyze-image")
async def analyze_image(
    file: UploadFile = File(None),
    image_url: str = Form(None),
    prompt: str = Form(...),
    system_prompt: str = Form("You are a helpful assistant.")
):
    try:
        if not file and not image_url:
            logger.error("No file or image URL provided")
            raise HTTPException(status_code=400, detail="Either file or image_url must be provided")
        
        logger.info(f"Processing image analysis request with prompt: {prompt[:50]}...")
        
        # Handle uploaded file
        if file:
            logger.info(f"Processing uploaded file: {file.filename}")
            
            # Create uploads directory if it doesn't exist
            upload_dir = Path("uploads")
            upload_dir.mkdir(exist_ok=True)
            
            # Save the uploaded file
            file_path = upload_dir / file.filename
            with open(file_path, "wb") as f:
                f.write(await file.read())
            
            # Convert image to base64
            with open(file_path, "rb") as image_file:
                encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
            
            image_url_obj = {
                "url": f"data:image/{file.filename.split('.')[-1]};base64,{encoded_image}"
            }
        else:
            logger.info(f"Processing image URL: {image_url[:50]}...")
            # Use provided URL
            image_url_obj = {"url": image_url}
        
        completion = client.chat.completions.create(
            model="qwen-vl-max-latest",
            messages=[
                {
                    "role": "system",
                    "content": [{"type": "text", "text": system_prompt}],
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image_url",
                            "image_url": image_url_obj,
                        },
                        {"type": "text", "text": prompt},
                    ],
                },
            ],
        )
        
        response = completion.choices[0].message.content
        logger.info(f"Image analysis completed successfully. Response length: {len(response)}")
        
        return {"response": response}
    except Exception as e:
        logger.error(f"Error in image analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    """Health check endpoint to verify API is running"""
    return {
        "status": "healthy",
        "api_key_configured": bool(os.getenv("DASHSCOPE_API_KEY"))
    }

if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", "8000"))
    host = os.getenv("HOST", "0.0.0.0")
    
    logger.info(f"Starting server on {host}:{port}")
    uvicorn.run("main:app", host=host, port=port, reload=True) 