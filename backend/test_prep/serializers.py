from rest_framework import serializers
from .models import TestPrepCourse

class TestPrepCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestPrepCourse
        fields = '__all__'
