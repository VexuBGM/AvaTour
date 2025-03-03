from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import LoginSerializer, UserSerializer, ProfileUpdateSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.middleware.csrf import get_token

User = get_user_model()

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class SessionLoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({"detail": "Session-based login successful."}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@method_decorator(csrf_exempt, name='dispatch')
class SessionLogoutView(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({"detail": "Logged out."}, status=status.HTTP_200_OK)

class CheckAuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"isAuthenticated": True, "username": request.user.username}, status=status.HTTP_200_OK)

class ProfileDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    @method_decorator(csrf_exempt)
    def delete(self, request):
        request.user.delete()
        return Response({"detail": "User deleted."}, status=status.HTTP_200_OK)

class ProfileUpdateView(generics.UpdateAPIView):
    serializer_class = ProfileUpdateSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['patch', 'put']

    def get_object(self):
        return self.request.user

    def perform_update(self, serializer):
        user = serializer.save()
        login(self.request, user) 

def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})