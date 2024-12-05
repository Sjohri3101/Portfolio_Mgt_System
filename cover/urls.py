from django.urls import path
from .views import cover

urlpatterns = [
path('',cover,name='cover'),
]