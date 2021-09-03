from django.contrib import admin
from . import models as user_models
# Register your models here.

admin.site.register(user_models.Profile)