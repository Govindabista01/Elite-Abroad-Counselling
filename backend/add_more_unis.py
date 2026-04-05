import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'elite_abroad.settings')
django.setup()

from destinations.models import Country, University

def add_universities():
    countries_data = {
        "Australia": [
            ("University of Queensland", "https://www.uq.edu.au"),
            ("Monash University", "https://www.monash.edu"),
            ("University of New South Wales", "https://www.unsw.edu.au"),
            ("University of Western Australia", "https://www.uwa.edu.au"),
            ("University of Adelaide", "https://www.adelaide.edu.au"),
            ("UTS - University of Technology Sydney", "https://www.uts.edu.au")
        ],
        "United Kingdom": [
            ("University College London (UCL)", "https://www.ucl.ac.uk"),
            ("University of Edinburgh", "https://www.ed.ac.uk"),
            ("King's College London", "https://www.kcl.ac.uk"),
            ("University of Manchester", "https://www.manchester.ac.uk"),
            ("London School of Economics (LSE)", "https://www.lse.ac.uk"),
            ("University of Warwick", "https://www.warwick.ac.uk")
        ],
        "Canada": [
            ("University of Alberta", "https://www.ualberta.ca"),
            ("University of Waterloo", "https://uwaterloo.ca"),
            ("Western University", "https://www.uwo.ca"),
            ("University of Calgary", "https://www.ucalgary.ca"),
            ("Queen's University", "https://www.queensu.ca"),
            ("Dalhousie University", "https://www.dal.ca")
        ],
        "Germany": [
            ("Berlin Institute of Technology", "https://www.tu-berlin.de"),
            ("University of Freiburg", "https://www.uni-freiburg.de"),
            ("Humboldt University of Berlin", "https://www.hu-berlin.de"),
            ("RWTH Aachen University", "https://www.rwth-aachen.de"),
            ("University of Bonn", "https://www.uni-bonn.de"),
            ("University of Hamburg", "https://www.uni-hamburg.de")
        ]
    }

    for country_name, unis in countries_data.items():
        try:
            country = Country.objects.get(name__icontains=country_name)
            print(f"Adding universities to {country.name}...")
            for uni_name, url in unis:
                University.objects.get_or_create(
                    name=uni_name,
                    country=country,
                    defaults={'website': url}
                )
                print(f"  - Added {uni_name}")
        except Country.DoesNotExist:
            print(f"Error: Country '{country_name}' not found in database.")

if __name__ == "__main__":
    add_universities()
    print("\n✅ 24 Universities added successfully!")
