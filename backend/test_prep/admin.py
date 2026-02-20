from django.contrib import admin
from .models import TestPrepCourse

@admin.register(TestPrepCourse)
class TestPrepCourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'duration', 'fee')
    search_fields = ('name',)
