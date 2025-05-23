import requests
import json

BASE_URL = "http://localhost:8000"

def test_root():
    response = requests.get(f"{BASE_URL}/")
    print("Root endpoint response:", response.json())

def test_chat():
    data = {
        "text": "Hello, how are you?",
        "system_prompt": "You are a helpful assistant."
    }
    response = requests.post(f"{BASE_URL}/api/chat", json=data)
    print("\nChat endpoint response:", response.json())

def test_image_analysis_with_url():
    # Test with a sample image URL
    image_url = "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20241022/emyrja/dog_and_girl.jpeg"
    
    data = {
        "image_url": image_url,
        "prompt": "What's in this image?",
        "system_prompt": "You are a helpful assistant."
    }
    
    response = requests.post(f"{BASE_URL}/api/analyze-image", data=data)
    print("\nImage analysis (URL) response:", response.json())

if __name__ == "__main__":
    print("Testing API endpoints...")
    try:
        test_root()
        test_chat()
        test_image_analysis_with_url()
        print("\nAll tests completed!")
    except Exception as e:
        print(f"\nError during testing: {e}")
        print("Make sure the API server is running at http://localhost:8000") 