# Generated by Django 4.0 on 2021-12-18 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_comment_content_alter_comment_post_alter_like_post'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='like',
            constraint=models.UniqueConstraint(fields=('post', 'user'), name='unique like'),
        ),
    ]