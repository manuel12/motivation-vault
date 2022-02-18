from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator

from .utils import get_model_data

# Create your models here.

LOREM_IPSUM_LONG = get_model_data('loremIpsumLong')
LOREM_IPSUM_SHORT = get_model_data('loremIpsumShort')
IMAGE_URL = get_model_data('imageUrl')

class Resource(models.Model):
    title = models.CharField(max_length=250)
    author = models.CharField(max_length=100)
    description = models.TextField(blank=True, default=LOREM_IPSUM_SHORT)
    imageURL = models.URLField(default=IMAGE_URL)
    
    value_one = models.TextField(blank=True, default=LOREM_IPSUM_SHORT)
    value_two = models.TextField(blank=True, default=LOREM_IPSUM_SHORT)
    value_three = models.TextField(blank=True, default=LOREM_IPSUM_SHORT)

    def __str__(self):
        return self.title

    def num_ratings(self):
        ratings = Rating.objects.filter(resource=self)
        return len(ratings)

    def avg_rating(self):
        ratings = Rating.objects.filter(resource=self)
        stars = sum([rating.stars for rating in ratings])
        return stars / len(ratings) if stars else 0

    def get_comments(self):
        comments = []
        resource_comments = Comment.objects.filter(resource=self)
        for comment in resource_comments:
          comments.append({
            'id': comment.id,
            'user': comment.user.username,
            'text': comment.text,
            'date': comment.date_created
          })
        return comments

    def get_youtube_url(self):
        try:
            motivational_speech = MotivationalSpeech.objects.get(title=self.title)
            return motivational_speech.youtube_url
        except MotivationalSpeech.DoesNotExist:
            pass

        try:
            podcast_episode = PodcastEpisode.objects.get(title=self.title)
            return podcast_episode.youtube_episode_url
        except PodcastEpisode.DoesNotExist:
            pass

        return None

    class Meta:
      ordering = ['-id']


class Book(Resource):
    subtitle = models.CharField(max_length=250)
    isbn = models.CharField(max_length=13)


class Podcast(Resource):
    website_url = models.URLField(max_length=200)
    youtube_url = models.URLField(max_length=200)
    spotify_url = models.URLField(max_length=200, default='http://open.spotify.com/')


class PodcastEpisode(Resource):
    from_podcast = models.ForeignKey(Podcast, on_delete=models.CASCADE)
    youtube_episode_url = models.URLField(max_length=200, blank=True, default='')
    spotify_episode_url = models.URLField(max_length=200, blank=True, default='')


class MotivationalSpeech(Resource):
    youtube_url = models.URLField(max_length=200)


class Comment(models.Model):
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(blank=False, null=False)
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.text

    def get_username(self):
        return self.user.username

    def get_datetime(self):
        return self.date_created.strftime('%Y/%m/%d %H:%M:%S')

    class Meta:
        ordering = ['-date_created']


class Rating(models.Model):
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stars = models.IntegerField(validators=[MinValueValidator(1),
                                            MaxValueValidator(5)])

    def get_resource_title(self):
        return self.resource.title

    def get_username(self):
        return self.user.username

    class Meta:
        unique_together = (('user', 'resource'),)
        index_together = (('user', 'resource'),)

