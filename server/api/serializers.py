from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Pokemon


class PokemonSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Pokemon
        fields = ['id', 'name', 'avatar', 'owner']


class UserSerializer(serializers.ModelSerializer):
    pokemon = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Pokemon.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'pokemon']
