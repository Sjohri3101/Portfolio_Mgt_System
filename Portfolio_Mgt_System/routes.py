from django.urls import path, include

# handler404 = 'layout.views.my_custom_page_not_found_view'

urlpatterns = [
    path("", include("home.urls")),
]