from django.contrib import admin
from resources import models
# Register your models here.

class ResourceAdmin(admin.ModelAdmin):
    list_display = ['pk', 'title', 'author', 'description']

class BookAdmin(ResourceAdmin):
    pass

class PodcastAdmin(ResourceAdmin):
    pass

class PodcastEpisodeAdmin(ResourceAdmin):
    pass

class MotivationalSpeechAdmin(ResourceAdmin):
    pass

class CommentAdmin(ResourceAdmin):
    list_display = ['pk', 'resource', 'user', 'text', 'date_created']

class RatingAdmin(admin.ModelAdmin):
    list_display = ['pk', 'resource', 'user', 'stars']

admin.site.register(models.Resource, ResourceAdmin)
admin.site.register(models.Book, BookAdmin)
admin.site.register(models.Podcast, PodcastAdmin)
admin.site.register(models.PodcastEpisode, PodcastEpisodeAdmin)
admin.site.register(models.MotivationalSpeech, MotivationalSpeechAdmin)
admin.site.register(models.Comment, CommentAdmin)
admin.site.register(models.Rating, RatingAdmin)




