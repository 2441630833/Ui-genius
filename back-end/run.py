import os
import uvicorn
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
log_level = os.getenv("LOG_LEVEL", "INFO")
logging.basicConfig(
    level=getattr(logging, log_level),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("ui-genius-api")

if __name__ == "__main__":
    port = int(os.getenv("PORT", "8000"))
    host = os.getenv("HOST", "0.0.0.0")
    
    # Check for API key configuration
    if not os.getenv("DASHSCOPE_API_KEY"):
        logger.warning("DASHSCOPE_API_KEY not found in environment variables")
        print("\n⚠️ WARNING: DASHSCOPE_API_KEY is not set in the .env file.")
        print("The API will run, but AI functionality will not work correctly.")
        print("Please add your API key to the .env file:\n")
        print("DASHSCOPE_API_KEY=your_dashscope_api_key_here\n")
    
    # Print startup information
    print(f"\n🚀 Starting UI Genius API server on {host}:{port}")
    print(f"📚 API documentation: http://{host if host != '0.0.0.0' else 'localhost'}:{port}/docs")
    print(f"🔍 Health check: http://{host if host != '0.0.0.0' else 'localhost'}:{port}/api/health")
    print("\n💡 Press CTRL+C to stop the server\n")
    
    # Run the server
    uvicorn.run("main:app", host=host, port=port, reload=True) 