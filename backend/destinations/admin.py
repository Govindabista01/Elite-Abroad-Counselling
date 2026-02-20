from django.contrib import admin
from .models import Country, University

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ('name', 'country', 'website')
    list_filter = ('country',)
    search_fields = ('name', 'country__name')
