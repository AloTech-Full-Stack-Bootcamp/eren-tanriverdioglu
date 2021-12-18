from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Post, Like, Comment


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'url']


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['id', 'image', 'content', 'author', 'created_at',
                  'like_count', 'comment_count', 'url']


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        fields = ['id', 'post', 'user', 'created_at', 'url']


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['id', 'post', 'user', 'created_at', 'url']
