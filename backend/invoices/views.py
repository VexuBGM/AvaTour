from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum
from .models import Invoice, Payment
from .serializers import InvoiceSerializer, PaymentSerializer

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Invoice.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

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

    @action(detail=True, methods=['delete'], url_path='payments/(?P<payment_id>[^/.]+)')
    def delete_payment(self, request, pk=None, payment_id=None):
        invoice = self.get_object()
        try:
            payment = invoice.payments.get(id=payment_id)
            payment.delete()
            invoice_serializer = InvoiceSerializer(invoice)
            return Response(invoice_serializer.data)
        except Payment.DoesNotExist:
            return Response(
                {"error": "Payment not found"},
                status=status.HTTP_404_NOT_FOUND
            )