import requests
import json
import time

def get_wiki_image_url(page_title):
    try:
        # First, get the page info to find the main image or images
        url = f"https://en.wikipedia.org/w/api.php?action=query&prop=pageimages|images&titles={requests.utils.quote(page_title)}&format=json&pithumbsize=500"
        headers = {'User-Agent': 'EliteAbroadBot/1.0'}
        resp = requests.get(url, headers=headers).json()
        pages = resp.get('query', {}).get('pages', {})
        for page_id, page in pages.items():
            if 'thumbnail' in page and page['thumbnail']['source']:
                return page['thumbnail']['source']
            elif 'images' in page:
                for img in page['images']:
                    title = img['title']
                    if 'logo' in title.lower() or 'coat' in title.lower() or 'crest' in title.lower() or 'shield' in title.lower():
                        # Get image url
                        img_url = f"https://en.wikipedia.org/w/api.php?action=query&titles={requests.utils.quote(title)}&prop=imageinfo&iiprop=url&format=json"
                        img_resp = requests.get(img_url, headers=headers).json()
                        img_pages = img_resp.get('query', {}).get('pages', {})
                        for _, img_page in img_pages.items():
                            if 'imageinfo' in img_page and len(img_page['imageinfo']) > 0:
                                return img_page['imageinfo'][0]['url']
    except Exception as e:
        print(f"Error {page_title}: {e}")
    return None

unis = [
    "University of Melbourne", "Australian National University", "University of Queensland", "University of New South Wales", "University of Adelaide", "University of Sydney",
    "University of Oxford", "University of Cambridge", "Imperial College London", "London School of Economics", "University of Edinburgh", "University College London",
    "University of Toronto", "McGill University", "University of British Columbia", "University of Waterloo", "University of Alberta", "University of Western Ontario",
    "Technical University of Munich", "RWTH Aachen University", "Humboldt University of Berlin", "Technical University of Berlin", "Ludwig Maximilian University of Munich", "Heidelberg University"
]

for u in unis:
    img = get_wiki_image_url(u)
    print(f"{u}: {img}")
    time.sleep(1)
