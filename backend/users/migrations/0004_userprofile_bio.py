# Generated by Django 3.2 on 2022-02-24 07:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_userfollowing'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='bio',
            field=models.CharField(default='Hello, I am new here!', max_length=256),
        ),
    ]