#!/usr/bin/env python3
"""
Environment Setup Script for UI Genius API

This script checks if a .env file exists and creates one with default values if it doesn't.
It also prompts the user to input their DASHSCOPE_API_KEY.
"""

import os
import sys
from pathlib import Path

def create_env_file():
    """Create a .env file with default values and prompt for API key"""
    env_file = Path(".env")
    
    # Check if .env file already exists
    if env_file.exists():
        print(f"\n✅ The .env file already exists at {env_file.absolute()}")
        print("If you want to recreate it, please delete the existing file first.")
        return
    
    # Default content for .env file
    default_content = """# API Keys
DASHSCOPE_API_KEY={api_key}

# Server Configuration
PORT=8000
HOST=0.0.0.0

# CORS Settings (optional)
# CORS_ORIGINS=http://localhost:8080,http://localhost:3000

# Logging (optional)
LOG_LEVEL=INFO
"""
    
    # Prompt user for API key
    print("\n🔑 UI Genius API Environment Setup")
    print("---------------------------------")
    print("Please enter your DashScope API key.")
    print("You can find or create your key at: https://dashscope.aliyun.com")
    api_key = input("\nAPI Key (press Enter to skip for now): ").strip()
    
    if not api_key:
        api_key = "your_dashscope_api_key_here"
        print("\n⚠️ No API key provided. Using placeholder value.")
        print("You will need to update the .env file manually before using the API.")
    
    # Create the .env file
    with open(env_file, "w") as f:
        f.write(default_content.format(api_key=api_key))
    
    print(f"\n✅ Successfully created .env file at {env_file.absolute()}")
    print("You can modify this file manually at any time.")

if __name__ == "__main__":
    # Ensure script is run from the back-end directory
    if not (Path.cwd() / "main.py").exists():
        print("❌ Error: This script must be run from the back-end directory.")
        print("Please navigate to the back-end directory and try again.")
        sys.exit(1)
    
    create_env_file()
    print("\n🚀 Environment setup complete!")
    print("You can now run the API server with: python run.py") 