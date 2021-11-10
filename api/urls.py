from rest_framework import routers
from django.urls import path
from api import views

router = routers.SimpleRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
	path('', views.ResourceAPIView.as_view()),
  path('<int:pk>/', views.ResourceDetailAPIView.as_view()),

  path('books/', views.BookAPIView.as_view()),
  path('books/<int:pk>/', views.BookDetailAPIView.as_view()),
  
  path('podcasts/', views.PodcastAPIView.as_view()),
  path('podcasts/<int:pk>/', views.PodcastDetailAPIView.as_view()),
  
  path('podcasts-episodes/', views.PodcastEpisodeAPIView.as_view()),
  path('podcasts-episodes/<int:pk>/', views.PodcastDetailAPIView.as_view()),

  path('motivational-speeches/', views.MotivationalSpeechAPIView.as_view()),
  path('motivational-speeches/<int:pk>/', views.MotivationalSpeechDetailAPIView.as_view()),

  path('comments/', views.CommentsAPIView.as_view()),
  path('ratings/', views.RatingsAPIView.as_view()),

]

urlpatterns += router.urls