# Generated by Django 2.2.6 on 2021-11-28 18:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0007_rating'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ['-date_created']},
        ),
        migrations.AlterModelOptions(
            name='resource',
            options={'ordering': ['-id']},
        ),
    ]
