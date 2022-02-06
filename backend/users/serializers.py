
from django.conf import settings
from django.contrib.auth import get_user_model

from rest_framework import serializers

from .models import UserProfile

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'password'
        ]


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = UserProfile
        fields = [
            'user',
            'image'
        ]