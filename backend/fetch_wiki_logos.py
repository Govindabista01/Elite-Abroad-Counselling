import requests
import json
import time
import os
from bs4 import BeautifulSoup

LOGOS_DIR = r"f:\EAC\frontend\public\logos"
os.makedirs(LOGOS_DIR, exist_ok=True)

headers = {
    'User-Agent': 'EliteAbroadCounsellingApp/1.0 (contact: admin@localhost.com)'
}

unis = [
    "University of Melbourne", "Australian National University", "University of Queensland", "University of New South Wales", "University of Adelaide", "University of Sydney",
    "University of Oxford", "University of Cambridge", "Imperial College London", "London School of Economics", "University of Edinburgh", "University College London",
    "University of Toronto", "McGill University", "University of British Columbia", "University of Waterloo", "University of Alberta", "Western University",
    "Technical University of Munich", "RWTH Aachen University", "Humboldt University of Berlin", "Berlin Institute of Technology", "Ludwig Maximilian University of Munich", "Heidelberg University"
]

def format_slug(name):
    return name.lower().replace(" ", "-").replace("(", "").replace(")", "").replace("'", "")

for page_title in unis:
    slug = format_slug(page_title)
    
    # Target path
    filepath_png = os.path.join(LOGOS_DIR, f"{slug}.png")
    filepath_svg = os.path.join(LOGOS_DIR, f"{slug}.svg")

    if (os.path.exists(filepath_png) and os.path.getsize(filepath_png) > 1000) or \
       (os.path.exists(filepath_svg) and os.path.getsize(filepath_svg) > 1000):
        print(f"Skipping {page_title}, already downloaded.")
        continue

    try:
        url = f"https://en.wikipedia.org/wiki/{requests.utils.quote(page_title.replace(' ', '_'))}"
        resp = requests.get(url, headers=headers)
        if resp.status_code != 200:
            print(f"Failed to fetch Wikipedia page for {page_title} - {resp.status_code}")
            continue

        soup = BeautifulSoup(resp.content, 'html.parser')
        
        # Look for the infobox
        infobox = soup.find('table', class_='infobox')
        if not infobox:
            print(f"No infobox found for {page_title}")
            continue
            
        # The logo is usually the first image in the infobox
        img_tag = infobox.find('img')
        if not img_tag:
            print(f"No image in infobox for {page_title}")
            continue
        
        # get srcset or src
        src = img_tag.get('src')
        if src.startswith('//'):
            src = "https:" + src
            
        # Optional: Wikipedia URLs return thumbnails like ".../200px-Logo.png". 
        # We can try to modify the URL to get a higher resolution (e.g. 500px or full size), 
        # but 200px or 220px is generally sharp enough for logos displayed at `w-16 h-16` (64px).
        # We will increase the thumb size to 400px by replacing the width constraint in the URL.
        import re
        src = re.sub(r'/(\d+)px-', r'/400px-', src)
        
        print(f"Downloading {page_title} from {src}")
        img_data = requests.get(src, headers=headers).content
        
        ext = "svg" if src.lower().endswith(".svg") else "png"
        filepath = os.path.join(LOGOS_DIR, f"{slug}.{ext}")
        
        with open(filepath, 'wb') as f:
            f.write(img_data)
        
        print(f" -> OK: {slug}.{ext}")
            
    except Exception as e:
        print(f"Error {page_title}: {e}")
    time.sleep(1)

print("\nDone downloading updated logos!")
