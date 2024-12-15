from django.urls import path
from .views import example_api  

urlpatterns = [
    path('api/example-endpoint/', example_api, name='example_api'),
]
