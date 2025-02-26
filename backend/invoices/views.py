from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Sum
from .models import Invoice, Payment
from .serializers import InvoiceSerializer, PaymentSerializer

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

    @action(detail=True, methods=['post'])
    def add_payment(self, request, pk=None):
        invoice = self.get_object()
        
        if invoice.is_fully_paid():
            return Response(
                {"error": "Invoice is already fully paid"},
                status=status.HTTP_400_BAD_REQUEST
            )

        payment_data = request.data
        payment_data['invoice'] = invoice.id
        
        serializer = PaymentSerializer(data=payment_data)
        if serializer.is_valid():
            serializer.save()
            invoice_serializer = InvoiceSerializer(invoice)
            return Response(invoice_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def payment_history(self, request, pk=None):
        invoice = self.get_object()
        payments = invoice.payments.all().order_by('-payment_date')
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)