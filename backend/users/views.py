from django.contrib.auth import get_user_model, authenticate

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import UserFollowing
from .serializers import UserFollowingSerializer

from posts.models import Post
from posts.serializers import PostSerializer

from users.serializers import UserSerializer, UserCreateSerializer

User = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["username"] = user.username
        token["email"] = user.email

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# {
#     "username": "test",
#     "password": "123456",
#     "email": "test@test.com"
# }
@api_view(["POST"])
def sign_up(request, *args, **kwargs):
    username = request.data.get("username", "")
    password = request.data.get("password", "")
    email = request.data.get("email", "")
    # files = request.FILES

    if len(password) < 6:
        return Response(
            {"errors": {"password": "Password must be 6 characters or more"}},
            status=status.HTTP_400_BAD_REQUEST,
        )

    username_user_exists = User.objects.filter(username=username)
    email_user_exists = User.objects.filter(email=email)

    if username_user_exists:
        return Response(
            {"errors": {"username": "Username is already in use"}},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if email_user_exists:
        return Response(
            {"errors": {"email": "Email is already in use"}},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user_data = {"username": username, "email": email, "password": password}
    serialized_data = UserCreateSerializer(data=user_data)
    if serialized_data.is_valid():
        serialized_data.save()
        return Response({"message": "user created"}, status=status.HTTP_201_CREATED)

    return Response(serialized_data.errors, status=status.HTTP_400_BAD_REQUEST)


# # {
# #     "username": "test",
# #     "password": "123456"
# # }
# @api_view(["POST"])
# def log_in(request, *args, **kwargs):
#     username = request.data.get("username", "")
#     password = request.data.get("password", "")
#     # files = request.FILES

#     username_user_exists = User.objects.filter(username=username)

#     if not username_user_exists:
#         return Response(
#             {"errors": {"username": "Username or Password is incorrect"}},
#             status=status.HTTP_400_BAD_REQUEST,
#         )

#     user = authenticate(username=username, password=password)
#     if not user:
#         return Response(
#             {"errors": {"username": "Username or Password is incorrect"}},
#             status=status.HTTP_400_BAD_REQUEST,
#         )

#     serialized_data = UserSerializer(user)
#     refresh = RefreshToken.for_user(user)

#     user_response = {}
#     user_response["id"] = serialized_data.data["id"]
#     user_response["username"] = serialized_data.data["username"]
#     user_response["email"] = serialized_data.data["email"]
#     user_response["refresh"] = str(refresh)
#     user_response["access"] = str(refresh.access_token)

#     return Response(user_response, status=status.HTTP_200_OK)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def follow_user(request, *args, **kwargs):
    user = request.user
    followingId = kwargs["followingId"]

    following_user = User.objects.filter(id=followingId).first()
    if not following_user:
        return Response(
            {"message": "not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    follow = UserFollowing.objects.filter(
        follower=user, following=following_user
    ).first()
    if follow:
        follow.delete()
    else:
        new_follow = UserFollowing.objects.create(
            follower=user, following=following_user
        )
        new_follow.save()

    following_serializer = UserSerializer(following_user)
    return Response(
        following_serializer.data,
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_detail(request, *args, **kwargs):
    username = kwargs["username"]
    user = User.objects.filter(username=username).first()
    serialized_data = UserSerializer(user)

    return Response(serialized_data.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_created_posts(request, *args, **kwargs):
    username = kwargs["username"]
    user = User.objects.filter(username=username).first()
    posts = Post.objects.filter(user=user)
    serialized_data = PostSerializer(posts, many=True)

    return Response(serialized_data.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_liked_posts(request, *args, **kwargs):
    username = kwargs["username"]
    user = User.objects.filter(username=username).first()
    print(user)
    posts = user.upvoted_posts.all()
    print(posts)
    serialized_data = PostSerializer(posts, many=True)

    return Response(serialized_data.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_all_users(request, *args, **kwargs):
    users = User.objects.all()
    serialized_data = UserSerializer(users, many=True)

    return Response(serialized_data.data, status=status.HTTP_200_OK)
