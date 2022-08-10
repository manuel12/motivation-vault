from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone
from pkg_resources import ResourceManager

from .utils import get_default_data

# Create your models here.

default_data = get_default_data()


class Resource(models.Model):
    title = models.CharField(max_length=250, unique=True)
    author = models.CharField(max_length=100)
    description = models.TextField(
        blank=True, default=default_data["loremIpsumShort"])
    imageURL = models.URLField(blank=True, default=default_data["imageUrl"])

    value_one = models.TextField(
        blank=True, default=default_data["loremIpsumShort"])
    value_two = models.TextField(
        blank=True, default=default_data["loremIpsumShort"])
    value_three = models.TextField(
        blank=True, default=default_data["loremIpsumShort"])

    objects = ResourceManager()

    def __str__(self):
        return self.title

    def num_ratings(self):
        resource_ratings = Rating.objects.filter(resource=self)
        return len(resource_ratings)

    def avg_rating(self):
        resource_ratings = Rating.objects.filter(resource=self)
        sum_stars = sum([rating.stars for rating in resource_ratings])
        return sum_stars / len(resource_ratings) if sum_stars else 0

    def get_comments(self):
        comments = []
        resource_comments = Comment.objects.filter(resource=self)
        for comment in resource_comments:
            comments.append(
                {
                    "id": comment.id,
                    "user": comment.user.username,
                    "text": comment.text,
                    "date": comment.get_formatted_date(),
                }
            )
        return comments

    def get_youtube_url(self):
        try:
            motivational_speech = MotivationalSpeech.objects.get(
                title=self.title)
            return motivational_speech.youtube_url
        except MotivationalSpeech.DoesNotExist:
            pass

        try:
            podcast_episode = PodcastEpisode.objects.get(title=self.title)
            return podcast_episode.youtube_episode_url
        except PodcastEpisode.DoesNotExist:
            pass

        return None

    def get_resource_type(self):
        resource_type = ""

        try:
            if Book.objects.get(title=self.title):
                resource_type = "book"
        except Book.DoesNotExist:
            pass

        try:
            if Podcast.objects.get(title=self.title):
                resource_type = "podcast"
        except Podcast.DoesNotExist:
            pass

        try:
            if PodcastEpisode.objects.get(title=self.title):
                resource_type = "podcast-episode"
        except PodcastEpisode.DoesNotExist:
            pass

        try:
            if MotivationalSpeech.objects.get(title=self.title):
                resource_type = "motivational-speech"
        except MotivationalSpeech.DoesNotExist:
            pass

        return resource_type

    class Meta:
        ordering = ["-id"]


class Book(Resource):
    subtitle = models.CharField(max_length=250)
    isbn = models.CharField(max_length=13)


class Podcast(Resource):
    website_url = models.URLField(max_length=200)
    youtube_page_url = models.URLField(max_length=200)
    spotify_page_url = models.URLField(
        max_length=200, default="http://open.spotify.com/"
    )


class PodcastEpisode(Resource):
    from_podcast = models.ForeignKey(Podcast, on_delete=models.CASCADE)
    youtube_episode_url = models.URLField(
        max_length=200, blank=True, default="")
    spotify_episode_url = models.URLField(
        max_length=200, blank=True, default="")


class MotivationalSpeech(Resource):
    youtube_url = models.URLField(max_length=200)


class Comment(models.Model):
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(null=False)
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.text

    def get_username(self):
        return self.user.username

    def get_formatted_date(self):
        return self.date_created.strftime("%Y/%m/%d %H:%M:%S")

    class Meta:
        ordering = ["-date_created"]


class Rating(models.Model):
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stars = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)])

    def __str__(self):
        stars = self.stars
        return f"{stars} stars" if stars > 1 else f"{stars} star"

    def get_resource_title(self):
        return self.resource.title

    def get_username(self):
        return self.user.username

    class Meta:
        unique_together = (("user", "resource"),)
        index_together = (("user", "resource"),)
