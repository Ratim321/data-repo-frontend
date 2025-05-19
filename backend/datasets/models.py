from django.db import models
from django.contrib.auth.models import User

class Dataset(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to='datasets/', null=True, blank=True)  # For zip files
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='datasets')

    def __str__(self):
        return self.title
