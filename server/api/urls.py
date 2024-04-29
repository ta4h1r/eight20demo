from django.urls import path, include
from api import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
	path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
]

urlpatterns = format_suffix_patterns(urlpatterns)

# Include login and logout views for the browsable API
urlpatterns += [
    path('api-auth/', include('rest_framework.urls'))
]
