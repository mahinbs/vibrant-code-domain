import urllib.request
import os
import time
import random

def download_image(url, filepath):
    try:
        # Add a fake user agent to avoid some 403s
        req = urllib.request.Request(
            url, 
            data=None, 
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        )
        with urllib.request.urlopen(req) as response:
            with open(filepath, 'wb') as out_file:
                out_file.write(response.read())
        print(f"Downloaded {filepath}")
        return True
    except Exception as e:
        print(f"Error downloading {url} to {filepath}: {e}")
        return False

base_dir = "public/assets/projects"

# 1. Rename RoomFit AI files
for i in range(1, 5):
    old_path = os.path.join(base_dir, f"RoomFit AI-{i}.jpg")
    new_path = os.path.join(base_dir, f"RoomFit-{i}.jpg")
    if os.path.exists(old_path):
        os.rename(old_path, new_path)
        print(f"Renamed {old_path} to {new_path}")
    else:
        print(f"Could not find {old_path}")

# 2. Download New Images
downloads = {
    "MicroInfluencer": ["influencer", "social media", "dashboard", "content creator"],
    "InvoiceGen": ["invoice", "receipt", "mobile payment", "billing"],
    "AttendanceQR": ["qr code", "scanning", "office", "employee"]
}

for prefix, keywords in downloads.items():
    for i in range(1, 5):
        keyword = keywords[(i-1) % len(keywords)]
        # Use loremflickr with a random lock to get different images
        url = f"https://loremflickr.com/800/600/{keyword}?lock={random.randint(1, 10000)}"
        filename = f"{prefix}-{i}.jpg"
        filepath = os.path.join(base_dir, filename)
        
        print(f"Downloading {filename}...")
        success = download_image(url, filepath)
        if not success:
            # Fallback to random if specific keyword fails (rare for loremflickr)
             url = f"https://loremflickr.com/800/600/business?lock={random.randint(1, 10000)}"
             download_image(url, filepath)
        time.sleep(1) # Be nice
