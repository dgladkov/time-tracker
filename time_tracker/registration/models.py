from django.db import models


class User(models.Model):
    username = models.CharField(max_length=40)
    email = models.EmailField(blank=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    registered = models.DateTimeField(auto_now_add=True)
