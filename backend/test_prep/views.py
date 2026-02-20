from rest_framework import viewsets
from .models import TestPrepCourse
from .serializers import TestPrepCourseSerializer

class TestPrepCourseViewSet(viewsets.ModelViewSet):
    queryset = TestPrepCourse.objects.all()
    serializer_class = TestPrepCourseSerializer
