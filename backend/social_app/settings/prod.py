from decouple import config

from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False
ALLOWED_HOSTS = ["social-app-aj.herokuapp.com", "localhost"]

# DEBUG = True
# ALLOWED_HOSTS = []

# # cors
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:3000",
#     "http://127.0.0.1:3000",
# ]

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

SECURE_PROXY_SLL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config("DJANGO_SECRET_KEY")

# static & media
# aws settings
AWS_S3_ACCESS_KEY_ID = config("AWS_S3_ACCESS_KEY_ID")
AWS_S3_SECRET_ACCESS_KEY = config("AWS_S3_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = config("AWS_STORAGE_BUCKET_NAME")
AWS_DEFAULT_ACL = None
AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"
AWS_S3_OBJECT_PARAMETERS = {"CacheControl": "max-age=86400"}
# s3 static settings
STATIC_LOCATION = "static"
STATIC_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{STATIC_LOCATION}/"
STATICFILES_STORAGE = "social_app.storage_backends.StaticStorage"
# s3 public media settings
PUBLIC_MEDIA_LOCATION = "media"
MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{PUBLIC_MEDIA_LOCATION}/"
DEFAULT_FILE_STORAGE = "social_app.storage_backends.PublicMediaStorage"

STATICFILES_DIRS = (os.path.join(BASE_DIR, "staticfiles"),)

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": config("POSTGRESQL_DB_NAME"),
        "USER": config("POSTGRESQL_DB_USER"),
        "PASSWORD": config("POSTGRESQL_DB_PASSWORD"),
        "HOST": config("POSTGRESQL_DB_HOST"),
        "PORT": config("POSTGRESQL_DB_PORT"),
    }
}
