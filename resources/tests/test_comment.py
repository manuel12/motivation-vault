import pytz
from datetime import datetime
from django.test import TestCase
from django.contrib.auth.models import User
from resources.models import Book, Comment

class CommentModelTests(TestCase):
    """Creates a comment and tests the fields."""

    def setUp(self):
        self.test_date = datetime(2022, 1, 1, 0, 0, 0, tzinfo=pytz.UTC)
        self.test_resource = Book.objects.create(title="12 Rules for Life",
                                                 author="Jordan B. Peterson",
                                                 subtitle="An antidote to chaos",
                                                 isbn=9780345816023)

        self.test_user = User.objects.create_user(
            username="testuser", password="testpassword")

        self.test_comment = Comment.objects.create(
            resource=self.test_resource,
            user=self.test_user,
            text="Great book, awesome!",
            date_created=self.test_date)

    def test_comment_resource(self):
        self.assertEqual(self.test_comment.resource, self.test_resource)

    def test_comment_user(self):
        self.assertEqual(self.test_comment.user, self.test_user)

    def test_comment_text(self):
        self.assertEqual(self.test_comment.text,
                         "Great book, awesome!")

    def test_comment_get_username(self):
        username = self.test_comment.get_username()
        self.assertEqual(username, "testuser")

    def test_comment_date_created(self):
        formatted_date = self.test_comment.get_formatted_date()
        self.assertEqual(formatted_date, "2022/01/01 00:00:00")

    def test_comment_string_representation(self):
        self.assertEqual(str(self.test_comment),
                         "Great book, awesome!")