from django.contrib.auth.models import AbstractUser
from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.pk}: {self.username}"


def file_upload_location(instance, filename):
    print(instance)
    return f"/profile/"


# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=file_upload_location, null=True, blank=True)

    def __str__(self):
        return f"{self.pk}: {self.user.username}"


@receiver(post_save, sender=CustomUser)
def save_user_profile(instance, created, *args, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
