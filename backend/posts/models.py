from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


def get_post_image_location(instance, filename):
    return f"images/{instance.user.username}/posts/" + filename


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    content = models.CharField(max_length=256)
    image = models.ImageField(upload_to=get_post_image_location, null=True, blank=True)
    upvoted_by = models.ManyToManyField(
        User, through="Upvote", related_name="upvoted_posts"
    )
    downvoted_by = models.ManyToManyField(
        User, through="Downvote", related_name="downvoted_posts"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    @property
    def votes(self):
        return self.upvoted_by.all().count() - self.downvoted_by.all().count()

    def __str__(self):
        return f"Post {self.pk} by {self.user.username}"


class Upvote(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = [["user", "post"]]

    def __str__(self):
        return f"Post {self.post.pk} by {self.user.username}"


class Downvote(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = [["user", "post"]]

    def __str__(self):
        return f"Post {self.post.pk} by {self.user.username}"
