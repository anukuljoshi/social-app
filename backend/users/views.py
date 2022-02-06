from django.contrib.auth import get_user_model
from django.core import validators

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from users.models import UserProfile
from users.serializers import UserSerializer, UserProfileSerializer

User = get_user_model()

# Create your views here.
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
    files = request.FILES

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
    serialized_data = UserSerializer(data=user_data)
    if serialized_data.is_valid():
        serialized_data.save()
        return Response({"message": "user created"}, status=status.HTTP_201_CREATED)

    return Response(serialized_data.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_all_users(request, *args, **kwargs):
    user_profiles = UserProfile.objects.all()
    serialized_data = UserProfileSerializer(user_profiles, many=True)

    return Response(serialized_data.data, status=status.HTTP_200_OK)
