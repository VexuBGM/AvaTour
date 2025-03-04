from django.http import JsonResponse
from django.middleware.csrf import get_token

def get_csrf_token(request):
    """Return the CSRF token in a JSON response"""
    return JsonResponse({"csrftoken": get_token(request)})