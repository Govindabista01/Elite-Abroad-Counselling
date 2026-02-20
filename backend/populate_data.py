import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'elite_abroad.settings')
django.setup()

from destinations.models import Country, University
from services.models import Service
from test_prep.models import TestPrepCourse
from blog.models import BlogPost
from core.models import User

# Get or create admin user for blog posts
admin_user = User.objects.get(username='admin')

print("Creating Countries...")
australia = Country.objects.create(
    name="Australia",
    description="Study in Australia and experience world-class education with beautiful beaches and vibrant cities. Home to top-ranked universities and diverse student communities."
)

uk = Country.objects.create(
    name="United Kingdom",
    description="The UK offers prestigious universities with rich history and excellent academic reputation. Experience multicultural cities and globally recognized degrees."
)

canada = Country.objects.create(
    name="Canada",
    description="Canada provides high-quality education in a safe, welcoming environment. Enjoy stunning natural landscapes and excellent post-study work opportunities."
)

germany = Country.objects.create(
    name="Germany",
    description="Study in Germany with low tuition fees and world-renowned engineering programs. Experience European culture and strong industry connections."
)

print("Creating Universities...")
# Australia
University.objects.create(name="University of Melbourne", country=australia, website="https://www.unimelb.edu.au")
University.objects.create(name="University of Sydney", country=australia, website="https://www.sydney.edu.au")
University.objects.create(name="Australian National University", country=australia, website="https://www.anu.edu.au")

# UK
University.objects.create(name="University of Oxford", country=uk, website="https://www.ox.ac.uk")
University.objects.create(name="University of Cambridge", country=uk, website="https://www.cam.ac.uk")
University.objects.create(name="Imperial College London", country=uk, website="https://www.imperial.ac.uk")

# Canada
University.objects.create(name="University of Toronto", country=canada, website="https://www.utoronto.ca")
University.objects.create(name="McGill University", country=canada, website="https://www.mcgill.ca")
University.objects.create(name="University of British Columbia", country=canada, website="https://www.ubc.ca")

# Germany
University.objects.create(name="Technical University of Munich", country=germany, website="https://www.tum.de")
University.objects.create(name="Ludwig Maximilian University", country=germany, website="https://www.lmu.de")
University.objects.create(name="Heidelberg University", country=germany, website="https://www.uni-heidelberg.de")

print("Creating Services...")
Service.objects.create(
    title="University Selection Counselling",
    description="Expert guidance to help you choose the right university based on your academic profile, career goals, and budget."
)
Service.objects.create(
    title="Visa Assistance",
    description="Complete support for student visa applications including documentation, interview preparation, and application tracking."
)
Service.objects.create(
    title="Scholarship Guidance",
    description="Identify and apply for scholarships and financial aid opportunities to reduce your study abroad costs."
)
Service.objects.create(
    title="Application Support",
    description="End-to-end assistance with university applications, essays, recommendations, and document preparation."
)

print("Creating Test Prep Courses...")
TestPrepCourse.objects.create(
    name="IELTS Preparation",
    description="Comprehensive IELTS training covering all four modules: Listening, Reading, Writing, and Speaking.",
    duration="8 weeks",
    fee=15000.00
)
TestPrepCourse.objects.create(
    name="TOEFL Preparation",
    description="Complete TOEFL iBT preparation with practice tests and expert guidance.",
    duration="6 weeks",
    fee=12000.00
)
TestPrepCourse.objects.create(
    name="PTE Academic",
    description="PTE Academic training with computer-based practice and scoring strategies.",
    duration="6 weeks",
    fee=12000.00
)

print("Creating Blog Posts...")
BlogPost.objects.create(
    title="Top Universities in Australia for International Students",
    slug="top-universities-australia",
    content="Australia is home to some of the world's best universities. In this guide, we explore the top institutions including the University of Melbourne, University of Sydney, and Australian National University. Learn about their programs, campus life, and admission requirements.",
    author=admin_user
)
BlogPost.objects.create(
    title="Student Visa Guide for UK - Complete Process",
    slug="uk-student-visa-guide",
    content="Applying for a UK student visa? This comprehensive guide covers the entire process from CAS letter to biometrics appointment. Learn about financial requirements, health surcharge, and interview tips.",
    author=admin_user
)
BlogPost.objects.create(
    title="Why Study in Canada? 10 Reasons to Choose Canadian Education",
    slug="why-study-canada",
    content="Canada has become one of the most popular destinations for international students. Discover the top 10 reasons including quality education, post-study work permits, multicultural society, and pathway to permanent residence.",
    author=admin_user
)
BlogPost.objects.create(
    title="Free Education in Germany: Complete Guide for International Students",
    slug="free-education-germany",
    content="Germany offers tuition-free education at public universities. Learn about the application process, language requirements, living costs, and how to make the most of studying in Germany.",
    author=admin_user
)

print("\n✅ Sample data created successfully!")
print("\nSummary:")
print(f"- {Country.objects.count()} Countries")
print(f"- {University.objects.count()} Universities")
print(f"- {Service.objects.count()} Services")
print(f"- {TestPrepCourse.objects.count()} Test Prep Courses")
print(f"- {BlogPost.objects.count()} Blog Posts")
