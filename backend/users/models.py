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
    return f"images/{instance.user.username}/profile/" + filename


# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, related_name="profile"
    )
    image = models.ImageField(upload_to=file_upload_location, null=True, blank=True)

    def __str__(self):
        return f"{self.pk}: {self.user.username}"


@receiver(post_save, sender=CustomUser)
def save_user_profile(sender, instance=None, created=False, *args, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


class UserFollowing(models.Model):
    follower = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="following"
    )
    following = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="followers"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [["follower", "following"]]
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.follower.username} follows {self.following.username}"


@receiver(post_save, sender=CustomUser)
def follow_self(sender, instance=None, created=False, *args, **kwargs):
    if created:
        follow = UserFollowing.objects.create(follower=instance, following=instance)
        follow.save()
