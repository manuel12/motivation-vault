from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from resources import models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user
        

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Resource
        fields = ('id', 'title', 'author', 'description', 'imageURL', 'value_one', 'value_two', 'value_three', 'get_comments', 'num_ratings', 'avg_rating')


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Book
        fields = ('id', 'title', 'subtitle', 'author', 'description', 'isbn', 'imageURL', 'avg_rating') 


class PodcastSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Podcast
        fields = ('id', 'title', 'author', 'description', 'website_url', 'youtube_url', 'imageURL', 'avg_rating')


class PodcastEpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PodcastEpisode
        fields = ('id', 'title', 'author', 'description', 'youtube_episode_url', 'spotify_episode_url', 'imageURL', 'avg_rating')


class MotivationalSpeechSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MotivationalSpeech
        fields = ('id', 'title', 'author', 'description', 'youtube_url', 'imageURL', 'avg_rating')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = ('id', 'get_username', 'text', 'get_datetime')


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Rating
        fields = ('id', 'resource', 'user', 'stars')
