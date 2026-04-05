import os
import requests
import time
from bs4 import BeautifulSoup

LOGOS_DIR = r"f:\EAC\frontend\public\logos"

headers = {
    'User-Agent': 'EliteAbroadCounsellingApp/1.0 (contact: admin@localhost.com)'
}

# (Wikipedia Search Title, Expected Slug)
unis_to_download = [
    ("University of Western Ontario", "western-university")
]

for wiki_title, slug in unis_to_download:
    try:
        url = f"https://en.wikipedia.org/wiki/{requests.utils.quote(wiki_title.replace(' ', '_'))}"
        resp = requests.get(url, headers=headers)
        if resp.status_code != 200:
            print(f"Failed to fetch {wiki_title} - {resp.status_code}")
            continue

        soup = BeautifulSoup(resp.content, 'html.parser')
        
        # Look for the infobox
        infobox = soup.find('table', class_='infobox')
        if not infobox:
            print(f"No infobox found for {wiki_title}")
            continue
            
        img_tag = infobox.find('img')
        if not img_tag:
            print(f"No image in infobox for {wiki_title}")
            continue
        
        src = img_tag.get('src')
        if src.startswith('//'):
            src = "https:" + src
            
        import re
        src = re.sub(r'/(\d+)px-', r'/400px-', src)
        
        print(f"Downloading {wiki_title} from {src}")
        img_data = requests.get(src, headers=headers).content
        
        ext = "svg" if src.lower().endswith(".svg") else "png"
        filepath = os.path.join(LOGOS_DIR, f"{slug}.{ext}")
        
        with open(filepath, 'wb') as f:
            f.write(img_data)
        
        print(f" -> OK: {slug}.{ext}")
            
    except Exception as e:
        print(f"Error {wiki_title}: {e}")
    time.sleep(1)
