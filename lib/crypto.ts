// Cryptocurrency constants for withdrawals
export interface Crypto {
  name: string;
  symbol: string;
  network: string;
  decimals: number;
  minWithdrawal: number;
}

export const CRYPTO_CURRENCIES: Record<string, Crypto> = {
  USDT: {
    name: 'Tether USD',
    symbol: 'USDT',
    network: 'ethereum',
    decimals: 6,
    minWithdrawal: 10,
  },
  USDC: {
    name: 'USD Coin',
    symbol: 'USDC',
    network: 'ethereum',
    decimals: 6,
    minWithdrawal: 10,
  },
  SOL: {
    name: 'Solana',
    symbol: 'SOL',
    network: 'solana',
    decimals: 9,
    minWithdrawal: 0.1,
  },
  ZEC: {
    name: 'Zcash',
    symbol: 'ZEC',
    network: 'zcash',
    decimals: 8,
    minWithdrawal: 0.01,
  },
};

export const SUPPORTED_CRYPTO_NETWORKS = ['ethereum', 'solana', 'zcash', 'polygon', 'bsc'];

export const CRYPTO_WITHDRAWAL_FEES = {
  USDT: 5, // $5 flat fee
  USDC: 5,
  SOL: 0.00025, // 0.025% fee
  ZEC: 0.001, // $0.001 fee
};

export const CRYPTO_PROCESSING_TIMES = {
  ethereum: '10-30 minutes',
  solana: '5-15 minutes',
  zcash: '20-60 minutes',
  polygon: '5-20 minutes',
  bsc: '10-30 minutes',
};

export const WITHDRAWAL_METHODS = [
  { id: 'bank', name: 'Bank Transfer', description: 'Transfer to your bank account', requiresCountry: true },
  { id: 'crypto', name: 'Cryptocurrency', description: 'Direct to crypto wallet (USDT, USDC, SOL, ZEC)', requiresCountry: false },
];

export const CRYPTO_NETWORKS_BY_CURRENCY: Record<string, string[]> = {
  USDT: ['ethereum', 'polygon', 'bsc', 'solana'],
  USDC: ['ethereum', 'polygon', 'bsc', 'solana'],
  SOL: ['solana'],
  ZEC: ['zcash'],
};
