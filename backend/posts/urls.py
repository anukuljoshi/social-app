from django.urls import path

from . import views

urlpatterns = [
    path("all/", views.get_all_posts),
    path("following/", views.get_following_user_posts),
    path("create/", views.create_post),
    path("<str:postId>/upvote/", views.upvote_post),
]
