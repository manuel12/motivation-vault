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


class ResourceListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        resource = models.Resource.objects.all()
        serializer = serializers.ResourceSerializer(resource, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        response = {'message': 'You cannot create from the resource class directly. '
        'You must create an instance of a subclass like Book, Podcast, PodcastEpisode '
        'or Motivational Speech.'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class ResourceDetailView(APIView):
    permission_classes = [AllowAny]

    def get_object(self, pk):
        try:
            return models.Resource.objects.get(pk=pk)
        except models.Resource.DoesNotExist:
            return

    def get(self, request, pk, format=None):
        resource = self.get_object(pk)
        serializer = serializers.ResourceSerializer(resource)
        return Response(serializer.data)


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

    def get(self, request, format=None):
        comments = models.Comment.objects.filter(user=request.user)
        serializer = serializers.CommentSerializer(comments, many=True)
        return Response(serializer.data)


class RatingsAPIView(generics.ListAPIView):
    queryset = models.Rating.objects.all()
    serializer_class = serializers.RatingSerializer
    # authentication_classes = (TokenAuthentication, )
    permission_classes = (AllowAny, )
