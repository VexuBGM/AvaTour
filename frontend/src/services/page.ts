import axios from 'axios';

interface CreateInvoiceData {
    party_type: 'supplier' | 'client';
    party_name: string;
    invoice_number: string;
    date: string;
    total_amount: number;
}

interface CreatePaymentData {
    amount: number;
    payment_date: string;
}

export const createInvoice = async (invoiceData: CreateInvoiceData) => {
    const response = await axios.post('http://localhost:8000/api/invoices/', invoiceData);
    return response.data;
};

export const createPayment = async (invoiceId: number, paymentData: CreatePaymentData) => {
    const response = await axios.post(`http://localhost:8000/api/invoices/${invoiceId}/add_payment/`, paymentData);
    return response.data;
};