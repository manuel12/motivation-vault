from django.http.response import Http404
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
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
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated,)

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
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated,)

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
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated,)

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
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated,)

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
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        podcast_episodes = models.PodcastEpisode.objects.all()
        serializer = serializers.PodcastEpisodeSerializer(podcast_episodes, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = serializers.PodcastEpisodeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PodcastEpisodeDetail(APIView):
    """
    Retrieve, update or delete a podcast episode instance.
    """
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated,)

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
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated,)

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
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated,)

    def get_object(self, pk):
      try:
          return models.MotivationalSpeech.objects.get(pk=pk)
      except models.MotivationalSpeech.DoesNotExist:
          raise Http404

    def get(self, request, pk, format=None):
        motivational_speech = self.get_object(pk)
        serializer = serializers.MotivationalSpeechSerializer(motivational_speech)
        return Response(serializer.data)


class CommentList(APIView):
    """
    List all comments, create a new comment, or delete all comments.
    """
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        comments = models.Comment.objects.all()
        serializer = serializers.CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        comment_data = {
          'user': request.user.pk,
          'resource': request.data['resource'],
          'text': request.data['text'],
        }
        serializer = serializers.CommentSerializer(data=comment_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        comments = models.Comment.objects.all()
        comments.delete()
        return Response('Comments deleted!', status=status.HTTP_204_NO_CONTENT)


class RatingList(APIView):
    """
    List all ratings, or create a new rating.
    """
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        ratings = models.Rating.objects.all() 
        serializer = serializers.RatingSerializer(ratings, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        if 'stars' in request.data:
            user = User.objects.get(pk=request.user.pk)
            resource = models.Resource.objects.get(pk=request.data['resource'])
            stars = int(request.data['stars'])

            try:
                rating = models.Rating.objects.get(user=user.pk, resource=resource.pk)
                rating.stars = stars
                rating.clean_fields()
                rating.save()

                serializer = serializers.RatingSerializer(rating, many=False)
                response = {'message': 'Rating updated', 'result': serializer.data}
                return Response(response, status=status.HTTP_200_OK)
            except:
                rating = models.Rating.objects.create(user=user, resource=resource, stars=stars)
                rating.clean_fields()

                serializer = serializers.RatingSerializer(rating, many=False)
                response = {'message': 'Rating created', 'result': serializer.data}
                return Response(response, status=status.HTTP_201_CREATED)
        else:
            response = {'message': 'You need to provide stars', 'data': request.data}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])

def delete_test_data(request):
    """
    Delete all resources, comments and ratings created by tests.
    """
    test_resources = models.Resource.objects.filter(title__startswith='Test Title')
    for resource in test_resources:
        resource.delete()
    return Response('Resource and comments deleted!', status=status.HTTP_204_NO_CONTENT)