const KORAPAY_SECRET_KEY = process.env.KORAPAY_SECRET_KEY;
const KORAPAY_PUBLIC_KEY = process.env.KORAPAY_PUBLIC_KEY;
const KORAPAY_BASE_URL = 'https://api.korapay.com/merchant/api/v1';

export type Currency = 'NGN' | 'USD' | 'GHS' | 'KES' | 'USDT' | 'SOL' | 'USDC' | string;

export interface InitializePaymentParams {
  amount: number;
  currency: Currency;
  customer: {
    name: string;
    email: string;
  };
  reference: string;
  notification_url?: string;
  redirect_url?: string;
  description?: string;
}

export async function initializePayment(params: InitializePaymentParams) {
  // If crypto, we might need a different provider, but for now we follow the instruction to use Korapay
  // If Korapay doesn't support it, we'll simulate or log a warning
  const response = await fetch(`${KORAPAY_BASE_URL}/charges/initialize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${KORAPAY_SECRET_KEY}`,
    },
    body: JSON.stringify({
      amount: params.amount,
      currency: params.currency,
      reference: params.reference,
      notification_url: params.notification_url,
      redirect_url: params.redirect_url,
      customer: params.customer,
      merchant_bears_cost: false,
      description: params.description,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to initialize Korapay payment');
  }

  return data.data;
}

export async function verifyPayment(reference: string) {
  const response = await fetch(`${KORAPAY_BASE_URL}/charges/${reference}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${KORAPAY_SECRET_KEY}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to verify Korapay payment');
  }

  return data.data;
}

export async function createPayout(params: {
  amount: number;
  currency: Currency;
  reference: string;
  destination: {
    type: 'bank_account' | 'mobile_money' | 'crypto_wallet';
    amount: number;
    currency: Currency;
    bank_account?: {
        bank_code: string;
        account_number: string;
    };
    crypto_wallet?: {
        network: string;
        address: string;
    }
  };
}) {
  const response = await fetch(`${KORAPAY_BASE_URL}/transactions/disburse`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${KORAPAY_SECRET_KEY}`,
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to process Korapay payout');
  }

  return data.data;
}
