from django.conf import settings
from django.contrib.auth import get_user_model

from rest_framework import serializers

from .models import UserProfile, UserFollowing

User = get_user_model()


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["image", "bio"]


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]

    def create(self, validated_data):
        user = super(UserCreateSerializer, self).create(validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user


class UserFollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = [
            "id",
            "follower",
            "following",
            "created_at",
        ]


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    followers = UserFollowingSerializer(many=True)
    following = UserFollowingSerializer(many=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "profile", "followers", "following"]
