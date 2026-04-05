from django.contrib import admin
from .models import Inquiry

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'destination', 'study_level', 'test_type', 'status', 'created_at')
    list_filter = ('status', 'destination', 'study_level', 'test_type', 'service')
    search_fields = ('name', 'email', 'phone', 'address', 'destination')
    list_editable = ('status',)
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)
