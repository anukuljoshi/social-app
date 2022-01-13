from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

# def file_upload_location(instance, filename):
#     return f'/profile/'

# # Create your models here.
# class UserProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     username = models.CharField(max_length=30)
#     image = models.ImageField(upload_to=file_upload_location)

#     def __str__(self):
#         return f'{self.pk}: {self.username}'
    