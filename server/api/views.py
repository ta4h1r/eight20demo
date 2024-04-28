from api.serializers import PokemonSerializer, UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from api.models import Pokemon
from rest_framework import permissions
from api.permissions import IsOwner

# Create your views here.
class PokemonList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer

    # Override to associate pokemon with user
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class PokemonRetrieve(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer

    # Override to associate pokemon with user
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class PokemonAdd(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer

    # Override to associate pokemon with user
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer