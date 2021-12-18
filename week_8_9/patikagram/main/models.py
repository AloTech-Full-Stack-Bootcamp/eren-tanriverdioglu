from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Post(models.Model):
    image = models.ImageField(upload_to='images/')
    content = models.CharField(max_length=45)
    author = models.ForeignKey(User, related_name="author", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def like_count(self):
        return self.likes.count()

    @property
    def comment_count(self):
        return self.comments.count()

    def __str__(self):
        return f"{self.content} posted by {self.author}"


class Like(models.Model):
    post = models.ForeignKey(Post, related_name="likes", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['post', 'user'], name="unique like")
        ]

    def __str__(self):
        return f"{self.post.content} liked by {self.user}"


class Comment(models.Model):
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=80, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.post.content} commented by {self.user}"
