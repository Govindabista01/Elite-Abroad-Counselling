from rest_framework import serializers
from .models import Country, University

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class UniversitySerializer(serializers.ModelSerializer):
    country_details = CountrySerializer(source='country', read_only=True)

    class Meta:
        model = University
        fields = '__all__'
