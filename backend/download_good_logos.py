import os
import requests
import time
import urllib.parse

LOGOS_DIR = r"f:\EAC\frontend\public\logos"
os.makedirs(LOGOS_DIR, exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

selected_unis = [
    # Australia
    (("Australia", "University of Melbourne", "https://www.unimelb.edu.au"), "university-of-melbourne", "https://upload.wikimedia.org/wikipedia/en/1/10/University_of_Melbourne_coat_of_arms.svg"),
    (("Australia", "Australian National University", "https://www.anu.edu.au"), "australian-national-university", "https://upload.wikimedia.org/wikipedia/en/3/34/Australian_National_University_coat_of_arms.svg"),
    (("Australia", "University of Queensland", "https://www.uq.edu.au"), "university-of-queensland", "https://upload.wikimedia.org/wikipedia/en/4/4c/University_of_Queensland_coat_of_arms.svg"),
    (("Australia", "University of New South Wales", "https://www.unsw.edu.au"), "university-of-new-south-wales", "https://upload.wikimedia.org/wikipedia/commons/f/ff/University_of_New_South_Wales_coat_of_arms.svg"),
    (("Australia", "University of Adelaide", "https://www.adelaide.edu.au"), "university-of-adelaide", "https://upload.wikimedia.org/wikipedia/en/2/21/University_of_Adelaide_logo.svg"),
    (("Australia", "University of Sydney", "https://www.sydney.edu.au"), "university-of-sydney", "https://upload.wikimedia.org/wikipedia/en/3/30/University_of_Sydney_coat_of_arms.svg"),

    # UK
    (("United Kingdom", "University of Oxford", "https://www.ox.ac.uk"), "university-of-oxford", "https://upload.wikimedia.org/wikipedia/en/f/ff/Oxford-University-Circlet.svg"),
    (("United Kingdom", "University of Cambridge", "https://www.cam.ac.uk"), "university-of-cambridge", "https://upload.wikimedia.org/wikipedia/en/c/c3/Cambridge_University_Crest_-_flat_version.svg"),
    (("United Kingdom", "Imperial College London", "https://www.imperial.ac.uk"), "imperial-college-london", "https://upload.wikimedia.org/wikipedia/en/6/6c/Imperial_College_London_crest.svg"),
    (("United Kingdom", "London School of Economics (LSE)", "https://www.lse.ac.uk"), "london-school-of-economics", "https://upload.wikimedia.org/wikipedia/commons/1/1b/LSE_Logo.svg"),
    (("United Kingdom", "University of Edinburgh", "https://www.ed.ac.uk"), "university-of-edinburgh", "https://upload.wikimedia.org/wikipedia/en/7/7f/The_University_of_Edinburgh_ceremonial_roundel.svg"),
    (("United Kingdom", "University College London", "https://www.ucl.ac.uk"), "university-college-london", "https://upload.wikimedia.org/wikipedia/en/a/a4/University_College_London_logo.svg"),

    # Canada
    (("Canada", "University of Toronto", "https://www.utoronto.ca"), "university-of-toronto", "https://upload.wikimedia.org/wikipedia/en/0/04/Utoronto_coa.svg"),
    (("Canada", "McGill University", "https://www.mcgill.ca"), "mcgill-university", "https://upload.wikimedia.org/wikipedia/en/2/2e/McGill_Coat_of_Arms.svg"),
    (("Canada", "University of British Columbia", "https://www.ubc.ca"), "university-of-british-columbia", "https://upload.wikimedia.org/wikipedia/en/e/e7/Ubc_coat_of_arms.svg"),
    (("Canada", "University of Waterloo", "https://uwaterloo.ca"), "university-of-waterloo", "https://upload.wikimedia.org/wikipedia/en/6/67/University_of_Waterloo_seal.svg"),
    (("Canada", "University of Alberta", "https://www.ualberta.ca"), "university-of-alberta", "https://upload.wikimedia.org/wikipedia/en/9/9f/University_of_Alberta_Logo.svg"),
    (("Canada", "Western University", "https://www.uwo.ca"), "western-university", "https://upload.wikimedia.org/wikipedia/en/5/5a/Western_University_logo.svg"),

    # Germany
    (("Germany", "Technical University of Munich", "https://www.tum.de"), "technical-university-of-munich", "https://upload.wikimedia.org/wikipedia/commons/c/c8/Logo_of_the_Technical_University_of_Munich.svg"),
    (("Germany", "RWTH Aachen University", "https://www.rwth-aachen.de"), "rwth-aachen-university", "https://upload.wikimedia.org/wikipedia/de/a/ab/RWTH_Aachen_Siegel_RGB.svg"),
    (("Germany", "Humboldt University of Berlin", "https://www.hu-berlin.de"), "humboldt-university-of-berlin", "https://upload.wikimedia.org/wikipedia/de/5/5e/Hu-berlin-siegel.svg"),
    (("Germany", "Berlin Institute of Technology", "https://www.tu-berlin.de"), "berlin-institute-of-technology", "https://upload.wikimedia.org/wikipedia/commons/3/30/Technische_Universit%C3%A4t_Berlin_logo.svg"),
    (("Germany", "Ludwig Maximilian University", "https://www.lmu.de"), "ludwig-maximilian-university", "https://upload.wikimedia.org/wikipedia/commons/d/df/Siegel_der_Ludwig-Maximilians-Universit%C3%A4t_M%C3%BCnchen.svg"),
    (("Germany", "Heidelberg University", "https://www.uni-heidelberg.de"), "heidelberg-university", "https://upload.wikimedia.org/wikipedia/de/9/98/Ruprecht-Karls-Universit%C3%A4t_Heidelberg_Logo.svg"),
]

def main():
    print("Downloading logos...")
    success_count = 0

    for _, slug, url in selected_unis:
        filename = slug + ".svg"
        filepath = os.path.join(LOGOS_DIR, filename)

        if os.path.exists(filepath):
            print(f"[{slug}] already exists.")
            success_count += 1
            continue

        try:
            print(f"Downloading {slug}...")
            # We must set a user-agent and potentially accept headers
            resp = requests.get(url, headers=headers, timeout=10)
            if resp.status_code == 200 and len(resp.content) > 500:
                with open(filepath, 'wb') as f:
                    f.write(resp.content)
                success_count += 1
                print(f" -> Success!")
            else:
                print(f" -> Failed HTTP {resp.status_code}")
                # Maybe try to find PNG fallback
                # Not doing it here to save logic
        except Exception as e:
            print(f" -> Exception: {e}")
        time.sleep(1) # Be polite

    print(f"\n✅ Finished! Downloaded {success_count}/{len(selected_unis)} logos.")

if __name__ == "__main__":
    main()
