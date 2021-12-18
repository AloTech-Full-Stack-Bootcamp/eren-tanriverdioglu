from django.contrib import admin

from .models import Post, Like, Comment

# Register your models here.

class LikeInline(admin.TabularInline):
    model = Like
    extra = 1
    readonly_fields = ('user', 'post')


class CommentInline(admin.TabularInline):
    model = Comment
    extra = 1
    readonly_fields = ('user', 'post')


class PostAdmin(admin.ModelAdmin):
    list_display = ['content', 'author', 'created_at']
    ordering = ['-created_at']
    list_filter = ['author']
    autocomplete_fields = ['author']
    search_field = ['content']
    inlines = [LikeInline, CommentInline]


admin.site.register(Post, PostAdmin)
admin.site.register(Like)
admin.site.register(Comment)
