from django.test import TestCase
from django.contrib.auth.models import User
from resources.models import Resource, Rating


class RatingModelTest(TestCase):
    """Creates a rating and tests the fields."""

    def setUp(self):
        self.test_resource = Resource.objects.create(
            title="Test Resource", author="Test Author")

        self.test_user = User.objects.create_user(
            username='testuser', password='testpassword')

        self.test_rating = Rating.objects.create(
            resource=self.test_resource,
            user=self.test_user,
            stars=3
        )

    def test_rating_resource(self):
        self.assertEqual(self.test_rating.resource, self.test_resource)

    def test_rating_user(self):
        self.assertEqual(self.test_rating.user, self.test_user)

    def test_rating_stars(self):
        self.assertEqual(self.test_rating.stars, 3)

    def test_rating_string_representation(self):
        self.assertEqual(str(self.test_rating), "3 stars")

    def test_rating_get_resource_title(self):
        resource_title = self.test_rating.get_resource_title()
        self.assertEqual(resource_title, self.test_resource.title)

    def test_rating_get_username(self):
        username = self.test_rating.get_username()
        self.assertEqual(username, self.test_user.username)
