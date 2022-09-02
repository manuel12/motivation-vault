from django.urls import path, re_path

from resources import views

urlpatterns = [
    path("", views.home, name="home"),
    re_path(r'^(?:.*)/?$', views.home)
]
