from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from rest_framework_simplejwt.token_blacklist.admin import OutstandingTokenAdmin
from rest_framework_simplejwt.token_blacklist import models

from .forms import CustomUserCreationForm, CustomUserChangeForm

from .models import CustomUser, UserProfile, UserFollowing


class CustomUserAdmin(UserAdmin):
    # forms
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm

    # fields
    model = CustomUser
    list_display = ["username", "email", "is_active"]
    list_filter = ["username", "email"]
    fieldsets = (
        (None, {"fields": ("username", "email", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_active")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username", "email", "password1", "password2"),
            },
        ),
    )
    search_fields = ("username",)


class NewOutstandingTokenAdmin(OutstandingTokenAdmin):
    def has_delete_permission(self, *args, **kwargs):
        return True


admin.site.unregister(models.OutstandingToken)
admin.site.register(models.OutstandingToken, NewOutstandingTokenAdmin)


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(UserProfile)
admin.site.register(UserFollowing)
