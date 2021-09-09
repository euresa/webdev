from django.db import models

# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=100)
    author = models.TextField()
    completed = models.BooleanField(default=False)
    serialNumber = models.IntegerField()

    def __str__(self):
        return self.title
