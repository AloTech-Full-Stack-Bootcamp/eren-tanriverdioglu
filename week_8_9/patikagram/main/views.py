from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action

from .serializers import UserSerializer, PostSerializer, CommentSerializer, LikeSerializer
from .models import Post, Like, Comment

# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['get'])
    def like(self, request, pk=None):
        post = self.get_object()
        queryset, new = Like.objects.get_or_create(post=post, user=request.user)
        serializer = LikeSerializer(queryset)
        return Response(serializer.data)


class CommentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class LikeViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LikeSerializer
    queryset = Like.objects.all()
    permission_classes = [permissions.IsAuthenticated]
