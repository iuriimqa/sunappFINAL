from django.shortcuts import render
from django.views.generic import detail

def home_view(request):
    context = {}
    return render(request, 'new.html' ,context)
