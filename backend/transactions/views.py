from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Transaction
from .serializers import TransactionSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return only transactions for the logged-in user, ordered by date (most recent first)
        return Transaction.objects.filter(user=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        # Automatically set the user to the logged-in user
        serializer.save(user=self.request.user)
