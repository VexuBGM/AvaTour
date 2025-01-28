from django.urls import path
from .views import UserCreateView, SessionLoginView, SessionLogoutView, CheckAuthView, ProfileDeleteView, csrf_token_view

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('session_login/', SessionLoginView.as_view(), name='session_login'),
    path('session_logout/', SessionLogoutView.as_view(), name='session_logout'),
    path('check_auth/', CheckAuthView.as_view(), name='check_auth'),
    path('delete/', ProfileDeleteView.as_view(), name='delete_profile'),
    path('csrf-token/', csrf_token_view, name='csrf_token'),
]