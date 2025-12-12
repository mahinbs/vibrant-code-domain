import urllib.request
import os
import time
import random

def download_image(keywords, filepath):
    try:
        # Use loremflickr with specific keywords and a random lock for variety
        url = f"https://loremflickr.com/800/600/{keywords}/all?lock={random.randint(1, 100000)}"
        
        req = urllib.request.Request(
            url, 
            data=None, 
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        )
        print(f"Downloading from {url} to {filepath}")
        with urllib.request.urlopen(req, timeout=10) as response:
            if response.getcode() == 200:
                with open(filepath, 'wb') as out_file:
                    out_file.write(response.read())
                print(f"Success: {filepath}")
                return True
            else:
                print(f"Failed with status {response.getcode()}: {url}")
                return False
    except Exception as e:
        print(f"Error downloading {filepath}: {e}")
        return False

base_dir = "public/assets/projects"
os.makedirs(base_dir, exist_ok=True)

# Product mapping with specific keywords for each of the 4 images
products = {
    "LeadQualifier": [
        "whatsapp,instagram,chat",
        "sales,leads,funnel",
        "digital,marketing,social",
        "message,notification,phone"
    ],
    "ProposalGen": [
        "document,proposal,paperwork",
        "agency,office,meeting",
        "contract,signature,pen",
        "business,presentation,laptop"
    ],
    "ReviewResponder": [
        "google,review,stars",
        "customer,feedback,smile",
        "restaurant,service,rating",
        "reputation,management,business"
    ],
    "MeetingNotes": [
        "video,call,conference",
        "notes,writing,meeting",
        "whatsapp,call,phone",
        "transcription,audio,recording"
    ],
    "RealEstateHub": [
        "real,estate,house,keys",
        "property,brochure,design",
        "realtor,agent,selling",
        "mortgage,calculator,finance"
    ],
    "RenewalTracker": [
        "calendar,reminder,date",
        "billing,invoice,payment",
        "freelancer,laptop,coffee",
        "subscription,renewal,alert"
    ]
}

for prefix, keyword_list in products.items():
    for i, keywords in enumerate(keyword_list):
        filename = f"{prefix}-{i+1}.jpg"
        filepath = os.path.join(base_dir, filename)
        # Add slight delay to be nice to the server
        time.sleep(1.5)
        download_image(keywords, filepath)
