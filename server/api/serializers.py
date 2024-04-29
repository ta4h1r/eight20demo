from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from api.validations import ValidationError
from api.models import PokemonModel


UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

    def create(self, clean_data):
        user_obj = UserModel.objects.create_user( 
            username=clean_data['username'], password=clean_data['password'])
        user_obj.fav_pokemon = clean_data["fav_pokemon"]
        user_obj.save()
        return user_obj


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        user = authenticate(
            username=clean_data['username'], password=clean_data['password'])
        if not user:
            raise ValidationError('user not found')
        return user


class PokemonSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.id')

    class Meta:
        model = PokemonModel
        fields = '__all__' 

    def create(self, owner, fav_pokemon): 
        poke_obj = PokemonModel.objects.create(owner=owner, fav_pokemon=fav_pokemon)
        return poke_obj


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'
