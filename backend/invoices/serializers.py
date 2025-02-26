from rest_framework import serializers
from .models import Invoice, Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'amount', 'payment_date', 'invoice', 'created_at']

    def validate(self, data):
        if 'amount' in data and 'invoice' in data:
            invoice = data['invoice']
            if invoice.get_total_payments() + data['amount'] > invoice.total_amount:
                raise serializers.ValidationError("Total payments cannot exceed invoice amount")
        return data

class InvoiceSerializer(serializers.ModelSerializer):
    payments = PaymentSerializer(many=True, read_only=True)
    remaining_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    is_fully_paid = serializers.BooleanField(read_only=True)
    total_paid = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Invoice
        fields = ['id', 'party_type', 'party_name', 'invoice_number', 
                 'date', 'total_amount', 'payments', 'remaining_amount',
                 'is_fully_paid', 'total_paid', 'created_at']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['remaining_amount'] = instance.get_remaining_amount()
        data['is_fully_paid'] = instance.is_fully_paid()
        data['total_paid'] = instance.get_total_payments()
        return data