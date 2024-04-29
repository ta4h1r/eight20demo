from django.contrib.auth import login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, PokemonSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_password
from .models import PokemonModel
from rest_framework import generics


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)

        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                 self.create_associated_pokemon(user, clean_data)
                 return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def create_associated_pokemon(self, user, clean_data):
        serializer = PokemonSerializer(data={
            "fav_pokemon": clean_data["fav_pokemon"],
            "owner": user, 
            "id": user.id
        })
        if serializer.is_valid(raise_exception=True):
            serializer.create(owner=user,
                fav_pokemon=clean_data["fav_pokemon"])


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    # authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        # assert validate_email(data)
        # assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    # authentication_classes = (SessionAuthentication, )

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


class UserPokemon(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    # authentication_classes = (SessionAuthentication, )

    queryset = PokemonModel.objects.all()
    serializer_class = PokemonSerializer
