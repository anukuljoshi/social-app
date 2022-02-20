from django.urls import path

from . import views

urlpatterns = [
    path("", views.home),
    path("all/", views.get_all_posts),
    path("create/", views.create_post),
    path("<str:postId>/upvote/", views.upvote_post),
]
