from django.contrib import admin
from django.urls import path
from .views import home, user_loggedin, signup, loggedout
from django.contrib.auth import views as auth_views
urlpatterns = [
path('admin/', admin.site.urls),
path('',home,name='home'),
path('user_loggedin',user_loggedin,name='user_loggedin'),
path('signup',signup,name='signup'),
path('loggedout',loggedout,name='loggedout'),
]