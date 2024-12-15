from django.http import JsonResponse

def example_api(request):
    data = {"message": "Hello from Django Backend!"}
    return JsonResponse(data)
