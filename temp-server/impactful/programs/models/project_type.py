from django.db import models

class ProjectType(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True)
    date_created = models.DateField(auto_now_add=True)
    date_deleted = models.DateField(null=True)