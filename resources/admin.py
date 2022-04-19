from csv import list_dialects

from django.contrib import admin

from resources import models

# Register your models here.


class ResourceAdmin(admin.ModelAdmin):
    list_display = ["pk", "title", "author", "description"]


class BookAdmin(ResourceAdmin):
    list_display = ["pk", "title", "author", "isbn"]


class PodcastAdmin(ResourceAdmin):
    list_display = ["pk", "title", "author", "youtube_page_url", "spotify_page_url"]


class PodcastEpisodeAdmin(ResourceAdmin):
    list_display = ["pk", "title", "youtube_episode_url", "from_podcast"]


class MotivationalSpeechAdmin(ResourceAdmin):
    list_display = ["pk", "title", "author", "youtube_url", "value_one"]


class CommentAdmin(ResourceAdmin):
    list_display = ["pk", "resource", "user", "text", "date_created"]


class RatingAdmin(admin.ModelAdmin):
    list_display = ["pk", "resource", "user", "stars"]


admin.site.register(models.Resource, ResourceAdmin)
admin.site.register(models.Book, BookAdmin)
admin.site.register(models.Podcast, PodcastAdmin)
admin.site.register(models.PodcastEpisode, PodcastEpisodeAdmin)
admin.site.register(models.MotivationalSpeech, MotivationalSpeechAdmin)
admin.site.register(models.Comment, CommentAdmin)
admin.site.register(models.Rating, RatingAdmin)
