from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Invoice, Payment
from .serializers import InvoiceSerializer, PaymentSerializer
from rest_framework import status

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

    @action(detail=True, methods=['post'])
    def add_payment(self, request, pk=None):
        invoice = self.get_object()
        payment_data = request.data
        payment_data['invoice'] = invoice.id
        
        serializer = PaymentSerializer(data=payment_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)