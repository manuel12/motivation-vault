# Generated by Django 2.2.6 on 2022-03-17 11:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0011_auto_20220317_1127'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resource',
            name='imageURL',
            field=models.URLField(default='https://bin.snmmd.nl/m/78x73ij2tm1d_1200x600.jpg/blog_podcastboeken.jpg'),
        ),
    ]