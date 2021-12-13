from django.urls import path, include
from rest_framework import routers

from .views import UserViewSet, PostViewSet, CommentViewSet, LikeViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'likes', LikeViewSet)

urlpatterns = router.urls
