from rest_framework import serializers
from .models import Invoice, Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'amount', 'payment_date']

class InvoiceSerializer(serializers.ModelSerializer):
    payments = PaymentSerializer(many=True, read_only=True)
    remaining_amount = serializers.SerializerMethodField()

    class Meta:
        model = Invoice
        fields = ['id', 'party_type', 'party_name', 'invoice_number', 
                 'date', 'total_amount', 'payments', 'remaining_amount']

    def get_remaining_amount(self, obj):
        paid_amount = sum(payment.amount for payment in obj.payments.all())
        return obj.total_amount - paid_amount