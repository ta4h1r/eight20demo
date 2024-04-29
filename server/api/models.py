from django.db import models

class PokemonModel(models.Model):
    fav_pokemon = models.CharField(max_length=100)
    owner = models.ForeignKey('auth.user', related_name='pokemon', on_delete=models.CASCADE)
