from django.test import TestCase
from resources.models import Book

class BookModelTests(TestCase):
    """Creates a book model and tests the fields."""

    def setUp(self):
        self.test_book = Book.objects.create(
            title="12 Rules for Life",
            author="Jordan B. Peterson",
            subtitle="An antidote to chaos",
            isbn=9780345816023
        )

    def test_subtitle(self):
        self.assertEqual(self.test_book.subtitle, "An antidote to chaos")

    def test_subtitle_max_length(self):
        subtitle_max_length = self.test_book._meta.get_field(
            'subtitle').max_length
        self.assertEqual(subtitle_max_length, 250)

    def test_isbn(self):
        self.assertEqual(self.test_book.isbn, 9780345816023)

    def test_isbn_13_is_chars_long(self):
        isbn_num_chars = len(str(self.test_book.isbn))
        self.assertEqual(isbn_num_chars, 13)