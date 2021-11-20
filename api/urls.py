from rest_framework import routers
from django.urls import path
from api import views

router = routers.SimpleRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
  path('', views.ResourceList.as_view()),
  path('<int:pk>/', views.ResourceDetail.as_view()),

  path('books/', views.BookList.as_view()),
  path('books/<int:pk>/', views.BookDetail.as_view()),

  path('podcasts/', views.PodcastList.as_view()),
  path('podcasts/<int:pk>/', views.PodcastDetail.as_view()),
  
  path('podcasts-episodes/', views.PodcastEpisodeList.as_view()),
  path('podcasts-episodes/<int:pk>/', views.PodcastEpisodeDetail.as_view()),

  path('motivational-speeches/', views.MotivationalSpeechList.as_view()),
  path('motivational-speeches/<int:pk>/', views.MotivationalSpeechDetail.as_view()),

  path('comments/', views.CommentsAPIView.as_view()),
  path('ratings/', views.RatingsAPIView.as_view()),
]

urlpatterns += router.urls
