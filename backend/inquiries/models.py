from django.db import models

class Inquiry(models.Model):
    STATUS_CHOICES = [
        ('NEW', 'New'),
        ('CONTACTED', 'Contacted'),
        ('IN_PROGRESS', 'In Progress'),
        ('CONVERTED', 'Converted'),
        ('CLOSED', 'Closed'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=255, blank=True, null=True)
    destination = models.CharField(max_length=100, blank=True, null=True)
    study_level = models.CharField(max_length=100, blank=True, null=True)
    test_type = models.CharField(max_length=100, blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    service = models.ForeignKey('services.Service', on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='NEW')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Inquiries"

    def __str__(self):
        return f"{self.name} - {self.destination} ({self.status})"
