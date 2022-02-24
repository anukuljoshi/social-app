from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Post, Upvote
from .serializers import PostSerializer, PostCreateSerializer

User = get_user_model()


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_posts(request, *args, **kwargs):
    posts = Post.objects.all()
    serialized_data = PostSerializer(posts, many=True)
    return Response(serialized_data.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_following_user_posts(request, *args, **kwargs):
    user = request.user

    following_users = user.following.all().values_list("following", flat=True)
    posts = Post.objects.filter(user__in=following_users)
    serialized_data = PostSerializer(posts, many=True)
    return Response(serialized_data.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_post(request, *args, **kwargs):
    user = request.user

    create_serializer = PostCreateSerializer(data=request.data)
    if create_serializer.is_valid():
        post = create_serializer.save(user=user)
        serialized_data = PostSerializer(post)
        return Response(serialized_data.data, status=status.HTTP_201_CREATED)
    else:
        return Response(create_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def upvote_post(request, *args, **kwargs):
    user = request.user
    postId = kwargs["postId"]

    post = Post.objects.filter(id=postId).first()
    upvote = Upvote.objects.filter(user=user, post=post).first()

    if upvote:
        upvote.delete()
    else:
        new_upvote = Upvote.objects.create(user=user, post=post)
        new_upvote.save()

    serialized_data = PostSerializer(post)
    return Response(serialized_data.data, status=status.HTTP_200_OK)
