from django.test import TestCase
from django.contrib.auth.models import User
from resources.models import Resource, MotivationalSpeech, Comment, Rating
from resources.utils import get_default_data


default_data = get_default_data()

class ResourceModelDefaultValuesTests(TestCase):
    """Creates a resource and tests all default values."""

    def setUp(self):
        self.test_resource = Resource.objects.create(
            title="Test Resource", author="Test Author")

    def test_resource_default_description(self):
        self.assertEqual(
            self.test_resource.description, default_data['loremIpsumShort'])

    def test_resource_default_imageURL(self):
        self.assertEqual(
            self.test_resource.imageURL, default_data['imageUrl'])

    def test_resource_default_value_one(self):
        self.assertEqual(
            self.test_resource.value_one, default_data['loremIpsumShort'])

    def test_resource_default_value_two(self):
        self.assertEqual(
            self.test_resource.value_one, default_data['loremIpsumShort'])

    def test_resource_default_value_three(self):
        self.assertEqual(
            self.test_resource.value_one, default_data['loremIpsumShort'])


class ResourceModelTests(TestCase):
    """Creates a resource and tests fields and methods."""

    def setUp(self):
        # Create resources, ratings and comments.
        self.test_resource = Resource.objects.create(
            title="The Little Prince",
            author="Antoine de Saint-Exupéry",
            description="The simple tale tells the story of a child, the little prince, who travels the universe gaining wisdom",
            imageURL="https://upload.wikimedia.org/wikipedia/en/0/05/Littleprince.JPG",
            value_one="It explains what is important in life",
            value_two="It explains the subject of authority",
            value_three="It explains the subject of lonelyness")

        self.test_resource_two = Resource.objects.create(
            title="Another Test Resource", author="Another Author")

        self.test_motivational_speech = MotivationalSpeech.objects.create(
            title="Test Motivational Speech",
            author="Test Author",
            youtube_url="https://www.youtube.com/watch?v=dQw4w9WgXcQ")

        test_user = User.objects.create_user(
            username='testuser', password='testpassword')

        test_user_two = User.objects.create_user(
            username='testuser_two', password='testpassword_two')

        self.test_comment = Comment.objects.create(
            resource=self.test_resource, user=test_user, text="Hello")

        self.test_rating_one = Rating.objects.create(
            resource=self.test_resource, user=test_user, stars=5)

        self.test_rating_two = Rating.objects.create(
            resource=self.test_resource_two, user=test_user, stars=1)

        self.test_rating_three = Rating.objects.create(
            resource=self.test_motivational_speech, user=test_user, stars=2)

        self.test_rating_four = Rating.objects.create(
            resource=self.test_resource, user=test_user_two, stars=2)

    def test_resource_title(self):
        self.assertEqual(self.test_resource.title, "The Little Prince")

    def test_resource_title_max_length(self):
        title_max_length = self.test_resource._meta.get_field(
            'title').max_length
        self.assertEqual(
            title_max_length, 250)

    def test_resource_author(self):
        self.assertEqual(self.test_resource.author,
                         "Antoine de Saint-Exupéry")

    def test_resource_author_max_length(self):
        author_max_length = self.test_resource._meta.get_field(
            'author').max_length
        self.assertEqual(
            author_max_length, 100)

    def test_resource_description(self):
        self.assertEqual(
            self.test_resource.description,
            "The simple tale tells the story of a child, the little prince, who travels the universe gaining wisdom")

    def test_description_blank_true(self):
        description_blank = self.test_resource._meta.get_field(
            'description').blank
        self.assertEqual(description_blank, True)

    def test_resource_imageURL(self):
        self.assertEqual(
            self.test_resource.imageURL,
            "https://upload.wikimedia.org/wikipedia/en/0/05/Littleprince.JPG")

    def test_resource_value_one(self):
        self.assertEqual(
            self.test_resource.value_one, "It explains what is important in life")

    def test_value_one_blank_true(self):
        value_one_blank = self.test_resource._meta.get_field('value_one').blank
        self.assertEqual(value_one_blank, True)

    def test_resource_value_two(self):
        self.assertEqual(
            self.test_resource.value_two, "It explains the subject of authority")

    def test_value_two_blank_true(self):
        value_two_blank = self.test_resource._meta.get_field('value_two').blank
        self.assertEqual(value_two_blank, True)

    def test_resource_value_three(self):
        self.assertEqual(
            self.test_resource.value_three, "It explains the subject of lonelyness")

    def test_value_three_blank_true(self):
        value_three_blank = self.test_resource._meta.get_field(
            'value_three').blank
        self.assertEqual(value_three_blank, True)

    def test_resource_string_representation(self):
        self.assertEqual(str(self.test_resource), "The Little Prince")

    def test_num_ratings(self):
        num_ratings = self.test_resource.num_ratings()
        self.assertEqual(num_ratings, 2)

    def test_avg_rating(self):
        avg_rating = self.test_resource.avg_rating()
        self.assertEqual(avg_rating, 3.5)

    def test_get_comments(self):
        comments = self.test_resource.get_comments()
        self.assertEqual(comments[0]['text'], "Hello")

    def test_get_youtube_url(self):
        youtube_url = self.test_motivational_speech.get_youtube_url()
        self.assertEqual(
            youtube_url, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
