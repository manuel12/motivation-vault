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
        

base_fields = ('id', 'title', 'author', 'description', 'imageURL')
ratings_fields = ('avg_rating', 'num_ratings')

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Resource
        fields = base_fields + ('value_one', 'value_two', 'value_three', 'get_comments') + ratings_fields


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Book
        fields = base_fields + ('subtitle', 'isbn') + ratings_fields 


class PodcastSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Podcast
        fields = base_fields + ('website_url', 'youtube_url') + ratings_fields


class PodcastEpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PodcastEpisode
        fields = base_fields + ('from_podcast', 'youtube_episode_url', 'spotify_episode_url') + ratings_fields


class MotivationalSpeechSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MotivationalSpeech
        fields = base_fields + ('youtube_url',) + ratings_fields 


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = ('id', 'resource', 'text', 'get_username', 'get_datetime')


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Rating
        fields = ('id', 'resource', 'user', 'stars', 'get_resource_title', 'get_username')
