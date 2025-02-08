from django.db import models
from django.conf import settings

class Transaction(models.Model):
    TRANSACTION_TYPES = (
        ('client', 'Client'),
        ('supplier', 'Supplier'),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='transactions'
    )
    transaction_type = models.CharField(
        max_length=10,
        choices=TRANSACTION_TYPES,
        help_text="Toggle: Client for adding funds, Supplier for removing funds"
    )
    name = models.CharField(max_length=255)
    date = models.DateField(help_text="Enter the date when the transaction occurred")
    sum = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.transaction_type.title()} - {self.name} - {self.sum} on {self.date}"
