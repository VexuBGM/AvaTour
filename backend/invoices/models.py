from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal
from django.core.exceptions import ValidationError
from django.conf import settings

class Invoice(models.Model):
    PARTY_TYPE_CHOICES = [
        ('supplier', 'Supplier'),
        ('client', 'Client'),
    ]

    party_type = models.CharField(max_length=8, choices=PARTY_TYPE_CHOICES)
    party_name = models.CharField(max_length=255)
    invoice_number = models.CharField(max_length=10)
    date = models.DateField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal('0.00'))])
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='invoices', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'invoice_number')

    def get_total_payments(self):
        return sum(payment.amount for payment in self.payments.all())

    def get_remaining_amount(self):
        return self.total_amount - self.get_total_payments()

    def is_fully_paid(self):
        return self.get_remaining_amount() <= 0

class Payment(models.Model):
    invoice = models.ForeignKey(Invoice, related_name='payments', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal('0.00'))])
    payment_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if not self.pk:  # Only for new payments
            total_paid = self.invoice.get_total_payments()
            if total_paid + self.amount > self.invoice.total_amount:
                raise ValidationError('Total payments cannot exceed invoice amount')

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)