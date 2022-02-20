from rest_framework import serializers

from users.serializers import UserSerializer

from .models import Post


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["content", "image"]


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    votes = serializers.IntegerField()

    class Meta:
        model = Post
        fields = [
            "id",
            "user",
            "content",
            "image",
            "votes",
            "upvoted_by",
            "downvoted_by",
            "created_at",
            "updated_at",
        ]
