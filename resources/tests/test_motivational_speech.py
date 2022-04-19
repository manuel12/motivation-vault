from django.test import TestCase

from resources.models import MotivationalSpeech


class MotivationalSpeechTests(TestCase):
    """Creates a motivational speech and tests the fields."""

    def setUp(self):
        self.test_motivational_speech = MotivationalSpeech.objects.create(
            title="The Craziest Talk EVER",
            author="Mulligan Brothers",
            youtube_url="https://www.youtube.com/watch?v=eIdHyqB-mE0",
        )

    def test_motivational_speech_youtube_url(self):
        youtube_url = self.test_motivational_speech.youtube_url
        self.assertEqual(youtube_url, "https://www.youtube.com/watch?v=eIdHyqB-mE0")

    def test_motivational_speech_youtube_url_max_length(self):
        youtube_url_max_length = self.test_motivational_speech._meta.get_field(
            "youtube_url"
        ).max_length
        self.assertEqual(youtube_url_max_length, 200)
