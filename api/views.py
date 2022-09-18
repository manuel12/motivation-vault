from django.contrib.auth.models import User
from resources import models
from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import APIView, ObtainAuthToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import (AllowAny, IsAuthenticated,
                                        IsAuthenticatedOrReadOnly)
from rest_framework.response import Response

from api import serializers

# Create your views here.


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid(raise_exception=False):
            user = serializer.validated_data["user"]
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        else:
            errors = {}
            error_types = ["username", "password", "non_field_errors"]
            for error_type in error_types:
                if error_type in serializer.errors:
                    errors[error_type] = str(serializer.errors[error_type][0])
            return Response({"errors": errors},
                            status=status.HTTP_400_BAD_REQUEST)


obtain_auth_token = CustomObtainAuthToken.as_view()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    permission_classes = (AllowAny,)


class ResourceView(APIView):
    resource_class = models.Resource
    serializer_class = serializers.ResourceSerializer

    def get_resource_class(self):
        return self.resource_class

    def get_serializer_class(self):
        return self.serializer_class


class ResourceList(ResourceView):
    """
    List all resources, or create a new resource.
    """
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def _post_error(self):
        response = {
            "message": "You cannot create from the Resource class directly. "
            "You must create an instance of a subclass like "
            "Book, Podcast, PodcastEpisode or Motivational Speech."
        }
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        resource_class = self.get_resource_class()
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(resource_class.objects.all(), many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        resource_name = self.get_resource_class().__name__

        # Do not allow any resource creation to occur from the Resource class.
        if resource_name == "Resource":
            return self._post_error()

        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResourceDetail(ResourceView):
    """
    Retrieve, update or delete a resource instance.
    """
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get_object(self, pk):
        resource_class = self.get_resource_class()
        try:
            return resource_class.objects.get(pk=pk)
        except resource_class.DoesNotExist:
            return False

    def get(self, request, pk):
        resource = self.get_object(pk)

        if resource:
            serializer_class = self.get_serializer_class()
            serializer = serializer_class(resource)

            # Attach flag to display edit/delete buttons on front-end.
            response_data = serializer.data
            response_data['can_edit_delete'] = request.user.is_staff
            return Response(response_data)
        return Response({"error": "Not found"})

    def put(self, request, pk):
        if request.user.is_staff:
            resource = self.get_object(pk)
            if resource:
                serializer_class = self.get_serializer_class()
                serializer = serializer_class(resource, data=request.data)
                if serializer.is_valid() and request.user.is_staff:
                    serializer.save()
                    return Response(serializer.data,
                                    status=status.HTTP_200_OK)
                return Response(serializer.errors,
                                status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, pk):
        if request.user.is_staff:
            print("On delete!")
            resource = self.get_object(pk)
            if resource:
                resource.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_403_FORBIDDEN)


class BookList(ResourceList):
    """
    List all books, or create a new book.
    """
    resource_class = models.Book
    serializer_class = serializers.BookSerializer


class BookDetail(ResourceDetail):
    """
    Retrieve a book instance.
    """

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    resource_class = models.Book
    serializer_class = serializers.BookSerializer


class PodcastList(ResourceList):
    """
    List all podcasts, or create a new podcast.
    """

    resource_class = models.Podcast
    serializer_class = serializers.PodcastSerializer


class PodcastDetail(ResourceDetail):
    """
    Retrieve a podcast instance.
    """

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    resource_class = models.Podcast
    serializer_class = serializers.PodcastSerializer


class PodcastEpisodeList(ResourceList):
    """
    List all podcasts episodes, or create a new podcast episode.
    """

    resource_class = models.PodcastEpisode
    serializer_class = serializers.PodcastEpisodeSerializer


class PodcastEpisodeDetail(ResourceDetail):
    """
    Retrieve a podcast episode instance.
    """

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    resource_class = models.PodcastEpisode
    serializer_class = serializers.PodcastEpisodeSerializer


class MotivationalSpeechList(ResourceList):
    """
    List all motivational speeches, or create a new motivational speech.
    """

    resource_class = models.MotivationalSpeech
    serializer_class = serializers.MotivationalSpeechSerializer


class MotivationalSpeechDetail(ResourceDetail):
    """
    Retrieve a motivational speech instance.
    """

    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    resource_class = models.MotivationalSpeech
    serializer_class = serializers.MotivationalSpeechSerializer


class CommentList(APIView):
    """
    List all comments, create a new comment, or delete all comments.
    """

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        comments = models.Comment.objects.all()
        serializer = serializers.CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request):
        comment_data = {
            "user": request.user.pk,
            "resource": request.data["resource"],
            "text": request.data["text"],
            "date_created": request.data["date"]
        }

        serializer = serializers.CommentSerializer(data=comment_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        comments = models.Comment.objects.all()
        comments.delete()
        return Response("Comments deleted!", status=status.HTTP_204_NO_CONTENT)


class RatingList(APIView):
    """
    List all ratings, or create a new rating.
    """

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        ratings = models.Rating.objects.all()
        serializer = serializers.RatingSerializer(ratings, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Try to either get an existing rating and update it's number of
        stars or create a new rating all together.

        If no stars are provided in request send a message.
        """
        if "stars" in request.data:
            stars = int(request.data["stars"])
            user = User.objects.get(pk=request.user.pk)
            resource = models.Resource.objects.get(pk=request.data["resource"])

            try:
                rating = models.Rating.objects.get(
                    user=user.pk, resource=resource.pk)
                rating.stars = stars
                rating.clean_fields()
                rating.save()

                serializer = serializers.RatingSerializer(rating, many=False)
                response = {"message": "Rating updated",
                            "result": serializer.data}
                return Response(response, status=status.HTTP_200_OK)
            except models.Rating.DoesNotExist:
                rating = models.Rating.objects.create(
                    user=user, resource=resource, stars=stars
                )
                rating.clean_fields()

                serializer = serializers.RatingSerializer(rating, many=False)
                response = {"message": "Rating created",
                            "result": serializer.data}
                return Response(response, status=status.HTTP_201_CREATED)
        else:
            response = {"message": "You need to provide stars",
                        "data": request.data}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([AllowAny])
def delete_test_data(request):
    """
    Delete all resources, comments and ratings created by tests.
    """
    test_resources = models.Resource.objects.filter(
        title__contains="Test Title")
    if(test_resources):
        test_resources.delete()

    test_users = models.User.objects.filter(username="newUser1")
    if(test_users):
        test_users.delete()

    response = {
        "message": "Test resources and their related comments deleted!",
    }
    return Response(
        response,
        status=status.HTTP_200_OK,
    )
