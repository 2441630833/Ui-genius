# Conda Environment Setup for UI Genius API

## Creating the Environment

Run the following commands to create and activate the conda environment:

```bash
# Navigate to the back-end directory
cd back-end

# Create the conda environment from the environment.yml file
conda env create -f environment.yml

# Activate the environment
conda activate ui-genius-api
```

## Setting Up Environment Variables

After activating the environment, set up your environment variables:

```bash
# Run the environment setup script (interactive)
python env_setup.py
```

This script will create a `.env` file in the back-end directory with the necessary configuration:

```
# API Keys
DASHSCOPE_API_KEY=your_dashscope_api_key_here

# Server Configuration
PORT=8000
HOST=0.0.0.0

# CORS Settings (optional)
# CORS_ORIGINS=http://localhost:8080,http://localhost:3000

# Logging (optional)
LOG_LEVEL=INFO
```

You can also create or edit this file manually if you prefer.

## Running the API

After activating the environment and setting up the `.env` file, you can run the API server:

```bash
# Run using the convenience script
python run.py

# Alternatively, run with uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Testing the API

After starting the server, you can test it with:

```bash
python test_api.py
```

## Updating the Environment

If you need to update the environment after changing dependencies:

```bash
conda env update -f environment.yml
``` 