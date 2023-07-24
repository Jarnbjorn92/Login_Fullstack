from django.db import models
# from django.contrib.auth.models import AbstractUser

class User(models.Model):
    name = models.CharField(max_length=32)
    password = models.CharField(max_length=32)

    def __str__(self):
        return self.name