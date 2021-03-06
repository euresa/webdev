from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now) #timezone.now is a function that gives the current time when called
    author = models.ForeignKey(User, on_delete=models.CASCADE) #models.CASCADE will delete all posts if user is deleted

    def __str__(self):
        return self.title


