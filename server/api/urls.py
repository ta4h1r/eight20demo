from django.urls import path, include
from api import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('', views.PokemonList.as_view()),
    path('<str:pk>', views.PokemonRetrieve.as_view()),
    path('create/', views.PokemonAdd.as_view()),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)

# Include login and logout views for the browsable API
urlpatterns += [
    path('api-auth/', include('rest_framework.urls'))
]
