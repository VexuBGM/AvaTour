from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal

class Invoice(models.Model):
    PARTY_TYPE_CHOICES = [
        ('supplier', 'Supplier'),
        ('client', 'Client'),
    ]

    party_type = models.CharField(max_length=8, choices=PARTY_TYPE_CHOICES)
    party_name = models.CharField(max_length=255)
    invoice_number = models.CharField(max_length=10, unique=True)
    date = models.DateField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal('0.00'))])
    created_at = models.DateTimeField(auto_now_add=True)

class Payment(models.Model):
    invoice = models.ForeignKey(Invoice, related_name='payments', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal('0.00'))])
    payment_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)