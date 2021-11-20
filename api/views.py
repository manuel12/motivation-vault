from django.http.response import Http404
from rest_framework import mixins
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from resources import models
from api import serializers

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = (AllowAny,)


class ResourceList(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format=None):
        resource = models.Resource.objects.all()
        serializer = serializers.ResourceSerializer(resource, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        response = {'message': 'You cannot create from the resource class directly. '
        'You must create an instance of a subclass like Book, Podcast, PodcastEpisode '
        'or Motivational Speech.'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class ResourceDetail(APIView):
    permission_classes = (AllowAny,)

    def get_object(self, pk):
        try:
            return models.Resource.objects.get(pk=pk)
        except models.Resource.DoesNotExist:
            return

    def get(self, request, pk, format=None):
        resource = self.get_object(pk)
        serializer = serializers.ResourceSerializer(resource)
        return Response(serializer.data)


class BookList(APIView):
    """
    List all books, or create a new book.
    """
    permission_classes = (AllowAny,)

    def get(self, request, format=None):
        books = models.Book.objects.all()
        serializer = serializers.BookSerializer(books, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = serializers.BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookDetail(APIView):
    """
    Retrieve, update or delete a book instance.
    """
    permission_classes = (AllowAny,)

    def get_object(self, pk):
      try:
          return models.Book.objects.get(pk=pk)
      except models.Book.DoesNotExist:
          raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = serializers.BookSerializer(snippet)
        return Response(serializer.data)


class PodcastList(APIView):
    """
    List all podcasts, or create a new podcast.
    """
    permission_classes = (AllowAny,)

    def get(self, request, format=None):
        podcasts = models.Podcast.objects.all()
        serializer = serializers.PodcastSerializer(podcasts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = serializers.PodcastSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PodcastDetail(APIView):
    """
    Retrieve, update or delete a podcast instance.
    """
    permission_classes = (AllowAny,)

    def get_object(self, pk):
      try:
          return models.Podcast.objects.get(pk=pk)
      except models.Podcast.DoesNotExist:
          raise Http404

    def get(self, request, pk, format=None):
        podcast = self.get_object(pk)
        serializer = serializers.PodcastSerializer(podcast)
        return Response(serializer.data)


class PodcastEpisodeList(APIView):
    """
    List all podcasts episodes, or create a new podcast episode.
    """
    permission_classes = (AllowAny,)

    def get(self, request, format=None):
        podcast_episodes = models.PodcastEpisode.objects.all()
        serializer = serializers.PodcastEpisodeSerializer(podcast_episodes, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        print(request.data)
        serializer = serializers.PodcastEpisodeSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PodcastEpisodeDetail(APIView):
    """
    Retrieve, update or delete a podcast episode instance.
    """
    permission_classes = (AllowAny,)

    def get_object(self, pk):
      try:
          return models.PodcastEpisode.objects.get(pk=pk)
      except models.PodcastEpisode.DoesNotExist:
          raise Http404

    def get(self, request, pk, format=None):
        podcast_episodes = self.get_object(pk)
        serializer = serializers.PodcastEpisodeSerializer(podcast_episodes)
        return Response(serializer.data)


class MotivationalSpeechList(APIView):
    """
    List all motivational speeches, or create a new motivational speech.
    """
    permission_classes = (AllowAny,)

    def get(self, request, format=None):
        motivational_speeches = models.MotivationalSpeech.objects.all()
        serializer = serializers.MotivationalSpeechSerializer(motivational_speeches, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = serializers.MotivationalSpeechSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MotivationalSpeechDetail(APIView):
    """
    Retrieve, update or delete a motivational speech instance.
    """
    permission_classes = (AllowAny,)

    def get_object(self, pk):
      try:
          return models.MotivationalSpeech.objects.get(pk=pk)
      except models.MotivationalSpeech.DoesNotExist:
          raise Http404

    def get(self, request, pk, format=None):
        motivational_speech = self.get_object(pk)
        serializer = serializers.MotivationalSpeechSerializer(motivational_speech)
        return Response(serializer.data)


class CommentsAPIView(generics.ListAPIView):
    queryset = models.Comment.objects.all()
    serializer_class = serializers.CommentSerializer
    # authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny, )

    def get(self, request, format=None):
        comments = models.Comment.objects.filter(user=request.user)
        serializer = serializers.CommentSerializer(comments, many=True)
        return Response(serializer.data)


class RatingsAPIView(generics.ListAPIView):
    queryset = models.Rating.objects.all()
    serializer_class = serializers.RatingSerializer
    # authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny, )
