"""
update_university_websites.py
Run this from the backend directory:
  python update_university_websites.py

This script:
1. Updates existing universities with their official website URLs
2. Adds any missing universities (so it's safe to run multiple times)
"""

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'elite_abroad.settings')
django.setup()

from destinations.models import Country, University

# ─── Complete University Data ────────────────────────────────────────────────
UNIVERSITIES = {
    "Australia": [
        ("University of Melbourne",         "https://www.unimelb.edu.au"),
        ("University of Sydney",            "https://www.sydney.edu.au"),
        ("Australian National University",  "https://www.anu.edu.au"),
        ("University of Queensland",        "https://www.uq.edu.au"),
        ("Monash University",               "https://www.monash.edu"),
        ("University of New South Wales",   "https://www.unsw.edu.au"),
        ("University of Western Australia", "https://www.uwa.edu.au"),
        ("University of Adelaide",          "https://www.adelaide.edu.au"),
        ("UTS - University of Technology Sydney", "https://www.uts.edu.au"),
        ("Macquarie University",            "https://www.mq.edu.au"),
        ("La Trobe University",             "https://www.latrobe.edu.au"),
        ("Deakin University",               "https://www.deakin.edu.au"),
        ("Griffith University",             "https://www.griffith.edu.au"),
        ("University of Wollongong",        "https://www.uow.edu.au"),
        ("Charles Darwin University",       "https://www.cdu.edu.au"),
        ("RMIT University",                 "https://www.rmit.edu.au"),
        ("Curtin University",               "https://www.curtin.edu.au"),
    ],
    "United Kingdom": [
        ("University of Oxford",            "https://www.ox.ac.uk"),
        ("University of Cambridge",         "https://www.cam.ac.uk"),
        ("Imperial College London",         "https://www.imperial.ac.uk"),
        ("University College London (UCL)", "https://www.ucl.ac.uk"),
        ("University of Edinburgh",         "https://www.ed.ac.uk"),
        ("King's College London",           "https://www.kcl.ac.uk"),
        ("University of Manchester",        "https://www.manchester.ac.uk"),
        ("London School of Economics (LSE)","https://www.lse.ac.uk"),
        ("University of Warwick",           "https://www.warwick.ac.uk"),
        ("University of Bristol",           "https://www.bristol.ac.uk"),
        ("University of Glasgow",           "https://www.gla.ac.uk"),
        ("University of Birmingham",        "https://www.birmingham.ac.uk"),
        ("University of Leeds",             "https://www.leeds.ac.uk"),
        ("University of Sheffield",         "https://www.sheffield.ac.uk"),
        ("University of Nottingham",        "https://www.nottingham.ac.uk"),
        ("University of Southampton",       "https://www.southampton.ac.uk"),
        ("University of East Anglia",       "https://www.uea.ac.uk"),
        ("University of Greenwich",         "https://www.gre.ac.uk"),
    ],
    "Canada": [
        ("University of Toronto",           "https://www.utoronto.ca"),
        ("McGill University",               "https://www.mcgill.ca"),
        ("University of British Columbia",  "https://www.ubc.ca"),
        ("University of Alberta",           "https://www.ualberta.ca"),
        ("University of Waterloo",          "https://uwaterloo.ca"),
        ("Western University",              "https://www.uwo.ca"),
        ("Queen's University",              "https://www.queensu.ca"),
        ("University of Calgary",           "https://www.ucalgary.ca"),
        ("Dalhousie University",            "https://www.dal.ca"),
        ("Simon Fraser University",         "https://www.sfu.ca"),
        ("University of Ottawa",            "https://www.uottawa.ca"),
        ("McMaster University",             "https://www.mcmaster.ca"),
    ],
    "Germany": [
        ("Technical University of Munich",  "https://www.tum.de"),
        ("Ludwig Maximilian University",    "https://www.lmu.de"),
        ("Heidelberg University",           "https://www.uni-heidelberg.de"),
        ("Humboldt University of Berlin",   "https://www.hu-berlin.de"),
        ("University of Bonn",              "https://www.uni-bonn.de"),
        ("RWTH Aachen University",          "https://www.rwth-aachen.de"),
        ("University of Hamburg",           "https://www.uni-hamburg.de"),
        ("University of Freiburg",          "https://www.uni-freiburg.de"),
        ("Berlin Institute of Technology",  "https://www.tu-berlin.de"),
        ("Karlsruhe Institute of Technology","https://www.kit.edu"),
        ("University of Frankfurt",         "https://www.uni-frankfurt.de"),
        ("University of Cologne",           "https://www.uni-koeln.de"),
    ],
}

print("=" * 60)
print("  University Website Updater")
print("=" * 60)

created_count = 0
updated_count = 0
skipped_count = 0

for country_name, universities in UNIVERSITIES.items():
    # Get or create the country
    country, _ = Country.objects.get_or_create(
        name=country_name,
        defaults={"description": f"Study in {country_name} with world-class education and excellent career opportunities."}
    )
    print(f"\n📍 {country_name}:")

    for uni_name, website in universities:
        uni, created = University.objects.get_or_create(
            name=uni_name,
            defaults={"country": country, "website": website}
        )
        if created:
            print(f"  ✅ CREATED  → {uni_name}")
            created_count += 1
        else:
            if uni.website != website:
                uni.website = website
                uni.save()
                print(f"  🔄 UPDATED  → {uni_name} ({website})")
                updated_count += 1
            else:
                print(f"  ✔  OK       → {uni_name}")
                skipped_count += 1

print("\n" + "=" * 60)
print(f"  ✅ Created:  {created_count} universities")
print(f"  🔄 Updated:  {updated_count} universities")
print(f"  ✔  Skipped:  {skipped_count} (already up to date)")
print(f"  📊 Total:    {University.objects.count()} universities in database")
print("=" * 60)
print("\nDone! Logos will now load automatically on the frontend.")
