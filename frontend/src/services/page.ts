import axios from 'axios';

axios.defaults.withCredentials = true;

const getCsrfToken = async () => {
    const response = await axios.get('http://localhost:8000/csrf-token/');
    axios.defaults.headers.common['X-CSRFToken'] = response.data.csrfToken;
};

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
    await getCsrfToken();
    const response = await axios.post('http://localhost:8000/api/invoices/', invoiceData);
    return response.data;
};

export const createPayment = async (invoiceId: number, paymentData: CreatePaymentData) => {
    await getCsrfToken();
    const response = await axios.post(`http://localhost:8000/api/invoices/${invoiceId}/add_payment/`, paymentData);
    return response.data;
};

export const fetchInvoices = async () => {
    await getCsrfToken();
    const response = await axios.get('http://localhost:8000/api/invoices/');
    return response.data;
};