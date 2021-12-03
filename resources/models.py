from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator

import resources

# Create your models here.

class Resource(models.Model):
    title = models.CharField(max_length=250)
    author = models.CharField(max_length=100)
    description = models.TextField(blank=True, default='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    imageURL = models.URLField(default='https://addicted2success.com/wp-content/uploads/2019/04/Here-Are-4-Reasons-Why-You-Should-Have-a-Podcast-Youtube-Channel-or-Online-Show-400x240.png')
    
    value_one = models.TextField(default='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
    value_two = models.TextField(default='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
    value_three = models.TextField(default='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')

    def __str__(self):
        return self.title

    def get_comments(self):
        comments = []
        resource_comments = Comment.objects.filter(resource=self)
        for comment in resource_comments:
          comments.append({
            'user': comment.user.username,
            'text': comment.text,
            'date': comment.date_created
          })
        return comments

    class Meta:
        ordering = ['-id']

    def num_ratings(self):
        ratings = Rating.objects.filter(resource=self)
        return len(ratings)

    def avg_rating(self):
        ratings = Rating.objects.filter(resource=self)
        stars = sum([rating.stars for rating in ratings])
        return stars / len(ratings) if stars else 0


class Book(Resource):
    subtitle = models.CharField(max_length=250)
    isbn = models.CharField(max_length=13)


class Podcast(Resource):
    website_url = models.URLField(max_length=200)
    youtube_url = models.URLField(max_length=200)


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

