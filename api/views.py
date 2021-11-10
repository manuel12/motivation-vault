from rest_framework import viewsets
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from resources import models
from api import serializers
from .utils import make_backup

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = (AllowAny,)


class ResourceAPIView(generics.ListAPIView):
    queryset = models.Resource.objects.all()
    serializer_class = serializers.ResourceSerializer
    # authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny, )

    def get_queryset(self):
        print(f'User: {self.request.user}')
        queryset = self.queryset
        queryset = queryset.all()

        make_backup(queryset)
        return queryset


class ResourceDetailAPIView(generics.RetrieveAPIView):
    queryset = models.Resource.objects.all()
    serializer_class = serializers.ResourceSerializer
    # authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny, )


class BookAPIView(generics.ListAPIView):
    queryset = models.Book.objects.all()
    serializer_class = serializers.BookSerializer
    # authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny, )


class BookDetailAPIView(generics.RetrieveAPIView):
    queryset = models.Book.objects.all()
    serializer_class = serializers.BookSerializer
    # authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny,)


class PodcastAPIView(generics.ListAPIView):
    queryset = models.Podcast.objects.all()
    serializer_class = serializers.PodcastSerializer
    # authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny, )


class PodcastDetailAPIView(generics.RetrieveAPIView):
    queryset = models.Podcast.objects.all()
    serializer_class = serializers.PodcastSerializer
    # authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny,)


class PodcastEpisodeAPIView(generics.ListAPIView):
    queryset = models.PodcastEpisode.objects.all()
    serializer_class = serializers.PodcastEpisodeSerializer
    # authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny, )


class PodcastEpisodeDetailAPIView(generics.RetrieveAPIView):
    queryset = models.PodcastEpisode.objects.all()
    serializer_class = serializers.PodcastEpisodeSerializer
    # authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny, )


class MotivationalSpeechAPIView(generics.ListAPIView):
    queryset = models.MotivationalSpeech.objects.all()
    serializer_class = serializers.MotivationalSpeechSerializer
    # authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny, )


class MotivationalSpeechDetailAPIView(generics.RetrieveAPIView):
    queryset = models.MotivationalSpeech.objects.all()
    serializer_class = serializers.MotivationalSpeechSerializer
    # authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny,)


class CommentsAPIView(generics.ListAPIView):
    queryset = models.Comment.objects.all()
    serializer_class = serializers.CommentSerializer
    # authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny, )


class RatingsAPIView(generics.ListAPIView):
    queryset = models.Rating.objects.all()
    serializer_class = serializers.RatingSerializer
    # authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny, )


    