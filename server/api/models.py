from django.db import models

class Pokemon(models.Model):
    name = models.CharField(max_length=100)
    avatar = models.URLField(max_length=100)
    owner = models.ForeignKey('auth.user', related_name='pokemon', on_delete=models.CASCADE)