from django.urls import path

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from . import views

urlpatterns = [
    path("", views.get_all_users),
    path("signup/", views.sign_up),
    # path("login/", views.log_in),
    path("token/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("<str:followingId>/follow/", views.follow_user),
    path("<str:username>/", views.get_user_detail),
    path("<str:username>/posts/", views.get_user_created_posts),
    path("<str:username>/posts/liked/", views.get_user_liked_posts),
]
