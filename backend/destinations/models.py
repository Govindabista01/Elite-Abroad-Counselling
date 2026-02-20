from django.db import models

class Country(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='countries/', blank=True, null=True)

    def __str__(self):
        return self.name

class University(models.Model):
    name = models.CharField(max_length=200)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='universities')
    website = models.URLField(blank=True)

    def __str__(self):
        return self.name
