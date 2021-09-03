from django.shortcuts import render
from .models import Post
# from django.http import HttpResponse
# Create your views here.


def home(req):
    context ={
        'posts': Post.objects.all()
    }
    return render(req, 'blog/home.html', context) 
    # Looks within the templates folder by defult
    # 'blog/home.html' is a path within templates

def about(req):
    return render(req, 'blog/about.html', {'title': 'About'})



