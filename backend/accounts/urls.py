from django.urls import path
from .views import UserCreateView, SessionLoginView, SessionLogoutView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('session_login/', SessionLoginView.as_view(), name='session_login'),
    path('session_logout/', SessionLogoutView.as_view(), name='session_logout'),
]