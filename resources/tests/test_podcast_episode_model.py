from django.test import TestCase
from resources.models import Podcast, PodcastEpisode


class PodcastEpisodeModelTest(TestCase):
    """Creates a podcast episodes and tests the fields."""

    def setUp(self):
        self.test_podcast = Podcast.objects.create(
            title="Impact Theory",
            author="Tom Bilyeu",
            website_url="https://impacttheory.com/",
            youtube_page_url="https://www.youtube.com/channel/UCnYMOamNKLGVlJgRUbamveA",
            spotify_page_url="https://open.spotify.com/show/1nARKz2vTIOb7gC9dusE4b")

        self.test_podcast_episode = PodcastEpisode.objects.create(
            title="How to Make Yourself Immune to Pain",
            author="Tom Bilyeu",
            from_podcast=self.test_podcast,
            youtube_episode_url="https://www.youtube.com/watch?v=78I9dTB9vqM&ab_channel=TomBilyeu",
            spotify_episode_url="https://open.spotify.com/episode/77cUi9csoSnYkARBAq9PcY")

    def test_podcast_episode_from_podcast(self):
        from_podcast = self.test_podcast_episode.from_podcast
        self.assertEqual(str(from_podcast), "Impact Theory")

    def test_podcast_episode_youtube_episode_url(self):
        youtube_episode_url = self.test_podcast_episode.youtube_episode_url
        self.assertEqual(
            youtube_episode_url,
            "https://www.youtube.com/watch?v=78I9dTB9vqM&ab_channel=TomBilyeu")

    def test_podcast_episode_youtube_episode_url_max_length(self):
        youtube_episode_url_max_length = self.self.test_podcast_episode._meta.get_field(
            'youtube_episode_url').max_length
        self.assertEqual(youtube_episode_url_max_length, 200)

    def test_podcast_episode_spotify_episode_url(self):
        spotify_episode_url = self.test_podcast_episode.spotify_episode_url
        self.assertEqual(
            spotify_episode_url,
            "https://open.spotify.com/episode/77cUi9csoSnYkARBAq9PcY")

    def test_podcast_episode_youtube_episode_url_max_length(self):
        spotify_episode_url_max_length = self.test_podcast_episode._meta.get_field(
            'spotify_episode_url').max_length
        self.assertEqual(spotify_episode_url_max_length, 200)
