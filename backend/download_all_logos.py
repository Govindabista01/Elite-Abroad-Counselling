"""
Download official university logos from Wikipedia Commons to /public/logos/
"""
import requests
import os
import time

LOGOS_DIR = r"f:\EAC\frontend\public\logos"
os.makedirs(LOGOS_DIR, exist_ok=True)

headers = {
    'User-Agent': 'EliteAbroadBot/1.0 (admin@eliteabroad.com)'
}

logos = {
    # ── Australia ─────────────────────────────────────────────────────────────
    "university-of-melbourne": "https://upload.wikimedia.org/wikipedia/en/1/10/University_of_Melbourne_coat_of_arms.svg",
    "university-of-sydney": "https://upload.wikimedia.org/wikipedia/en/3/30/University_of_Sydney_coat_of_arms.svg",
    "australian-national-university": "https://upload.wikimedia.org/wikipedia/en/3/34/Australian_National_University_coat_of_arms.svg",
    "monash-university": "https://upload.wikimedia.org/wikipedia/en/0/00/Monash_University_coat_of_arms.svg",
    "university-of-queensland": "https://upload.wikimedia.org/wikipedia/en/4/4c/University_of_Queensland_coat_of_arms.svg",
    "rmit-university": "https://upload.wikimedia.org/wikipedia/en/7/71/RMIT_University_Logo.svg",
    "university-of-new-south-wales": "https://upload.wikimedia.org/wikipedia/commons/f/ff/University_of_New_South_Wales_coat_of_arms.svg",
    "university-of-adelaide": "https://upload.wikimedia.org/wikipedia/en/2/21/University_of_Adelaide_logo.svg",
    "university-of-western-australia": "https://upload.wikimedia.org/wikipedia/en/e/e4/University_of_Western_Australia_coat_of_arms.svg",
    "macquarie-university": "https://upload.wikimedia.org/wikipedia/en/5/5b/Macquarie_University_logo.svg",
    "university-of-technology-sydney": "https://upload.wikimedia.org/wikipedia/en/3/36/University_of_Technology_Sydney_logo.svg",
    "uts-university-of-technology-sydney": "https://upload.wikimedia.org/wikipedia/en/3/36/University_of_Technology_Sydney_logo.svg",
    "deakin-university": "https://upload.wikimedia.org/wikipedia/en/3/3a/Deakin_University_logo.svg",
    "la-trobe-university": "https://upload.wikimedia.org/wikipedia/en/b/b5/La_Trobe_University_logo.svg",
    "griffith-university": "https://upload.wikimedia.org/wikipedia/en/7/78/Griffith_University_logo.svg",
    "curtin-university": "https://upload.wikimedia.org/wikipedia/en/2/20/Curtin_University_logo.svg",
    "queensland-university-of-technology": "https://upload.wikimedia.org/wikipedia/en/c/c3/QUT_Logo.svg",
    "university-of-wollongong": "https://upload.wikimedia.org/wikipedia/en/0/0c/University_of_Wollongong_logo.svg",
    "james-cook-university": "https://upload.wikimedia.org/wikipedia/en/a/a3/James_Cook_University_logo_2020.svg",
    "bond-university": "https://upload.wikimedia.org/wikipedia/en/7/71/Bond_University_Logo.svg",
    "swinburne-university-of-technology": "https://upload.wikimedia.org/wikipedia/en/c/c7/Swinburne_University_of_Technology_logo.svg",
    "murdoch-university": "https://upload.wikimedia.org/wikipedia/en/f/f3/Murdoch_University_logo.svg",
    "charles-darwin-university": "https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Charles_Darwin_University_Logo.svg/1024px-Charles_Darwin_University_Logo.svg.png",

    # ── United Kingdom ────────────────────────────────────────────────────────
    "university-of-oxford": "https://upload.wikimedia.org/wikipedia/en/f/ff/Oxford-University-Circlet.svg",
    "university-of-cambridge": "https://upload.wikimedia.org/wikipedia/en/c/c3/Cambridge_University_Crest_-_flat_version.svg",
    "imperial-college-london": "https://upload.wikimedia.org/wikipedia/en/6/6c/Imperial_College_London_crest.svg",
    "university-college-london": "https://upload.wikimedia.org/wikipedia/en/a/a4/University_College_London_logo.svg",
    "ucl": "https://upload.wikimedia.org/wikipedia/en/a/a4/University_College_London_logo.svg",
    "london-school-of-economics": "https://upload.wikimedia.org/wikipedia/commons/1/1b/LSE_Logo.svg",
    "university-of-edinburgh": "https://upload.wikimedia.org/wikipedia/en/7/7f/The_University_of_Edinburgh_ceremonial_roundel.svg",
    "university-of-manchester": "https://upload.wikimedia.org/wikipedia/en/d/d2/University_of_Manchester_logo.svg",
    "kings-college-london": "https://upload.wikimedia.org/wikipedia/en/1/11/Kings_College_London_logo.svg",
    "university-of-bristol": "https://upload.wikimedia.org/wikipedia/en/b/b5/University_of_Bristol_coat_of_arms.svg",
    "university-of-glasgow": "https://upload.wikimedia.org/wikipedia/en/8/81/University_of_Glasgow_coat_of_arms.svg",
    "university-of-warwick": "https://upload.wikimedia.org/wikipedia/en/d/d1/University_of_Warwick_coat_of_arms.svg",
    "university-of-leeds": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Coat_of_Arms_of_the_University_of_Leeds.svg",
    "university-of-sheffield": "https://upload.wikimedia.org/wikipedia/en/e/e3/University_of_Sheffield_coat_of_arms.svg",
    "university-of-nottingham": "https://upload.wikimedia.org/wikipedia/en/7/7b/UoN_coat_of_arms.svg",
    "university-of-birmingham": "https://upload.wikimedia.org/wikipedia/en/c/c1/University_of_Birmingham_coat_of_arms.svg",
    "durham-university": "https://upload.wikimedia.org/wikipedia/en/4/43/Durham_University_coat_of_arms.svg",
    "university-of-southampton": "https://upload.wikimedia.org/wikipedia/en/e/e7/University_of_Southampton_arms.svg",
    "university-of-exeter": "https://upload.wikimedia.org/wikipedia/en/e/e2/University_of_Exeter_coat_of_arms.svg",
    "university-of-york": "https://upload.wikimedia.org/wikipedia/en/9/9e/University_of_York_coat_of_arms.svg",
    "newcastle-university": "https://upload.wikimedia.org/wikipedia/en/8/88/Newcastle_University_coat_of_arms.svg",
    "loughborough-university": "https://upload.wikimedia.org/wikipedia/en/4/41/Lboro_colour.svg",
    "university-of-st-andrews": "https://upload.wikimedia.org/wikipedia/en/e/ef/University_of_St_Andrews_coat_of_arms.svg",
    "cardiff-university": "https://upload.wikimedia.org/wikipedia/en/9/9e/Cardiff_University_coat_of_arms.svg",
    "university-of-bath": "https://upload.wikimedia.org/wikipedia/en/6/6f/University_of_Bath_logo.svg",
    "lancaster-university": "https://upload.wikimedia.org/wikipedia/en/9/9d/Lancaster_University_coat_of_arms.svg",
    "university-of-east-anglia": "https://upload.wikimedia.org/wikipedia/commons/5/52/University_of_East_Anglia_arms.svg",
    "university-of-greenwich": "https://upload.wikimedia.org/wikipedia/en/d/d5/University_of_Greenwich_logo.svg",

    # ── Canada ────────────────────────────────────────────────────────────────
    "university-of-toronto": "https://upload.wikimedia.org/wikipedia/en/0/04/Utoronto_coa.svg",
    "mcgill-university": "https://upload.wikimedia.org/wikipedia/en/2/2e/McGill_Coat_of_Arms.svg",
    "university-of-british-columbia": "https://upload.wikimedia.org/wikipedia/en/e/e7/Ubc_coat_of_arms.svg",
    "university-of-waterloo": "https://upload.wikimedia.org/wikipedia/en/6/67/University_of_Waterloo_seal.svg",
    "mcmaster-university": "https://upload.wikimedia.org/wikipedia/en/d/d8/McMaster_University_logo.svg",
    "university-of-alberta": "https://upload.wikimedia.org/wikipedia/en/9/9f/University_of_Alberta_Logo.svg",
    "western-university": "https://upload.wikimedia.org/wikipedia/en/5/5a/Western_University_logo.svg",
    "queens-university": "https://upload.wikimedia.org/wikipedia/en/b/b6/Queens_University_CoA.svg",
    "dalhousie-university": "https://upload.wikimedia.org/wikipedia/en/2/2e/Dalhousie_University_Crest.svg",
    "university-of-calgary": "https://upload.wikimedia.org/wikipedia/en/6/6b/University_of_Calgary_-_coat_of_arms.svg",
    "simon-fraser-university": "https://upload.wikimedia.org/wikipedia/en/b/b3/Simon_Fraser_University_logo.svg",
    "university-of-ottawa": "https://upload.wikimedia.org/wikipedia/en/a/ab/University_of_Ottawa_coat_of_arms.svg",
    "concordia-university": "https://upload.wikimedia.org/wikipedia/en/2/28/Concordia_University_logo.svg",
    "university-of-victoria": "https://upload.wikimedia.org/wikipedia/en/5/5c/University_of_Victoria_logo.svg",
    "carleton-university": "https://upload.wikimedia.org/wikipedia/en/e/ed/Carleton_University_logo.svg",

    # ── Germany ────────────────────────────────────────────────────────────────
    "technical-university-of-munich": "https://upload.wikimedia.org/wikipedia/commons/c/c8/Logo_of_the_Technical_University_of_Munich.svg",
    "rwth-aachen-university": "https://upload.wikimedia.org/wikipedia/de/a/ab/RWTH_Aachen_Siegel_RGB.svg",
    "humboldt-university-of-berlin": "https://upload.wikimedia.org/wikipedia/de/5/5e/Hu-berlin-siegel.svg",
    "university-of-frankfurt": "https://upload.wikimedia.org/wikipedia/de/1/1c/Goethe_University_Frankfurt_logo.svg",
    "karlsruhe-institute-of-technology": "https://upload.wikimedia.org/wikipedia/de/8/8e/KIT-Logo.svg",
    "university-of-hamburg": "https://upload.wikimedia.org/wikipedia/de/1/14/UniHH_Logo.svg",
    "university-of-bonn": "https://upload.wikimedia.org/wikipedia/de/e/e8/Universit%C3%A4t_Bonn_logo.svg",
    "berlin-institute-of-technology": "https://upload.wikimedia.org/wikipedia/commons/3/30/Technische_Universit%C3%A4t_Berlin_logo.svg",
    "university-of-freiburg": "https://upload.wikimedia.org/wikipedia/de/f/f6/Albert-Ludwigs-Universit%C3%A4t_Freiburg_2009_logo.svg",
    "ludwig-maximilian-university": "https://upload.wikimedia.org/wikipedia/commons/d/df/Siegel_der_Ludwig-Maximilians-Universit%C3%A4t_M%C3%BCnchen.svg",

    # ── New Zealand ────────────────────────────────────────────────────────────
    "university-of-auckland": "https://upload.wikimedia.org/wikipedia/en/6/6e/University_of_Auckland_coat_of_arms.svg",
    "university-of-otago": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/University_of_Otago_logo.png/280px-University_of_Otago_logo.png",
    "massey-university": "https://upload.wikimedia.org/wikipedia/en/6/63/Massey_University_logo.svg",

    # ── Ireland ───────────────────────────────────────────────────────────────
    "trinity-college-dublin": "https://upload.wikimedia.org/wikipedia/en/a/af/TC_Dublin_Coat_of_Arms.svg",
    "university-college-dublin": "https://upload.wikimedia.org/wikipedia/en/9/90/University_College_Dublin_coat_of_arms.svg",
    "university-college-cork": "https://upload.wikimedia.org/wikipedia/en/9/96/UCC_crest.svg",

    # ── Netherlands ───────────────────────────────────────────────────────────
    "delft-university-of-technology": "https://upload.wikimedia.org/wikipedia/de/4/43/TU_Delft_Logo.svg",
    "university-of-amsterdam": "https://upload.wikimedia.org/wikipedia/nl/4/40/Universiteit_van_Amsterdam_logo.svg",
    "leiden-university": "https://upload.wikimedia.org/wikipedia/en/2/24/Leiden_University_coat_of_arms.svg",

    # ── USA ───────────────────────────────────────────────────────────────────
    "massachusetts-institute-of-technology": "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg",
    "harvard-university": "https://upload.wikimedia.org/wikipedia/en/2/29/Harvard_shield_wreath.svg",
    "stanford-university": "https://upload.wikimedia.org/wikipedia/en/b/b7/Stanford_University_seal_2003.svg",
    "yale-university": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Yale_University_logo.svg",
    "princeton-university": "https://upload.wikimedia.org/wikipedia/en/d/d7/Princeton_seal.svg",
    "columbia-university": "https://upload.wikimedia.org/wikipedia/en/4/47/Columbia_University_coat_of_arms.svg",
    "cornell-university": "https://upload.wikimedia.org/wikipedia/en/6/6c/Cornell_University_seal.svg",
    "carnegie-mellon-university": "https://upload.wikimedia.org/wikipedia/commons/b/bb/Carnegie_Mellon_University_seal.svg",
    "new-york-university": "https://upload.wikimedia.org/wikipedia/en/8/8b/NYU_logo.svg",
}

def download(slug, url):
    ext = ".svg" if url.endswith(".svg") else ".png"
    filename = slug + ext
    filepath = os.path.join(LOGOS_DIR, filename)
    if os.path.exists(filepath) and os.path.getsize(filepath) > 500:
        print(f"  SKIP  {filename}")
        return filename
    
    try:
        resp = requests.get(url, headers=headers, timeout=10)
        data = resp.content
        if resp.status_code != 200 or len(data) < 500:
            print(f"  FAIL HTTP {resp.status_code} {filename} ({len(data)} bytes) - skipping")
            return None
        with open(filepath, 'wb') as f:
            f.write(data)
        print(f"  OK    {filename} ({len(data)//1024}KB)")
        return filename
    except Exception as e:
        print(f"  ERROR {filename}: {e}")
        return None

print(f"Downloading {len(logos)} university logos...\n")
success = 0
for slug, url in logos.items():
    result = download(slug, url)
    if result:
        success += 1
    time.sleep(1)

print(f"\nDone! {success}/{len(logos)} logos saved to:")
print(f"  {LOGOS_DIR}")
