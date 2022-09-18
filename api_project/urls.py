from django.contrib import admin
from django.urls import include, path, re_path

from api.views import obtain_auth_token

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    path("auth/", obtain_auth_token),
    path("", include("resources.urls")),
    re_path(r'^(?:.*)/?$', include('resources.urls')),
]
