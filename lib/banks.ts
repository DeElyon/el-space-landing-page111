// Banks by country for withdrawal
export type CountryCode = 'NG' | 'GH' | 'KE' | 'US' | 'GB' | 'CA' | 'IN' | 'ZA' | 'TZ' | 'ET' | 'UG';

export interface Bank {
  code: string;
  name: string;
  currency: string;
}

export const BANKS_BY_COUNTRY: Record<CountryCode, Bank[]> = {
  NG: [
    // Tier 1 Banks
    { code: '044', name: 'Access Bank Nigeria', currency: 'NGN' },
    { code: '050', name: 'Guaranty Trust Bank (GTBank)', currency: 'NGN' },
    { code: '011', name: 'First City Monument Bank (FCMB)', currency: 'NGN' },
    { code: '012', name: 'Union Bank of Nigeria', currency: 'NGN' },
    { code: '214', name: 'Zenith Bank', currency: 'NGN' },
    { code: '058', name: 'Guaranty Trust Bank Mobile', currency: 'NGN' },
    { code: '070', name: 'Fidelity Bank Nigeria', currency: 'NGN' },
    { code: '063', name: 'United Bank For Africa (UBA)', currency: 'NGN' },
    { code: '304', name: 'Stanbic IBTC Bank', currency: 'NGN' },
    { code: '084', name: 'Ecobank Nigeria', currency: 'NGN' },
    
    // Other Commercial Banks
    { code: '023', name: 'Bank of Industry', currency: 'NGN' },
    { code: '035', name: 'Wema Bank', currency: 'NGN' },
    { code: '068', name: 'Standard Chartered Bank Nigeria', currency: 'NGN' },
    { code: '076', name: 'Skye Bank (Polaris)', currency: 'NGN' },
    { code: '065', name: 'Keystone Bank Nigeria', currency: 'NGN' },
    { code: '999', name: 'Fidelity Bank', currency: 'NGN' },
    
    // Microfinance and Fintech Banks
    { code: '540', name: 'OPay', currency: 'NGN' },
    { code: '501', name: 'Palmpay (Sterling Bank)', currency: 'NGN' },
    { code: '990', name: 'Kuda MFB', currency: 'NGN' },
    { code: '966', name: 'Carbon (formerly Paylend)', currency: 'NGN' },
    { code: '960', name: 'Sparkle MFB', currency: 'NGN' },
    { code: '526', name: 'Moniepoint MFB', currency: 'NGN' },
    { code: '618', name: 'Standard Chartered MFB', currency: 'NGN' },
    { code: '101', name: 'Providus Bank', currency: 'NGN' },
    { code: '100', name: 'Suntrust Bank Nigeria', currency: 'NGN' },
    
    // Additional Banks
    { code: '403', name: 'JAIZ Bank', currency: 'NGN' },
    { code: '102', name: 'Vanguard Bank', currency: 'NGN' },
    { code: '058', name: 'Gtco (GTBank)', currency: 'NGN' },
    { code: '039', name: 'Infinity Bank', currency: 'NGN' },
    { code: '809', name: 'Village Financial Services', currency: 'NGN' },
    { code: '038', name: 'Heritage Bank', currency: 'NGN' },
    { code: '037', name: 'Zenith Bank Alt Code', currency: 'NGN' },
  ],
  GH: [
    { code: '010050', name: 'Ecobank Ghana', currency: 'GHS' },
    { code: '010100', name: 'Zenith Bank Ghana', currency: 'GHS' },
    { code: '010500', name: 'Absa Bank Ghana', currency: 'GHS' },
    { code: '010200', name: 'Standard Chartered Bank Ghana', currency: 'GHS' },
    { code: '010400', name: 'Barclays Bank Ghana', currency: 'GHS' },
    { code: '010600', name: 'FirstBank Ghana', currency: 'GHS' },
    { code: '010700', name: 'UBA Ghana', currency: 'GHS' },
    { code: '010900', name: 'MTN Ghana', currency: 'GHS' },
  ],
  KE: [
    { code: '001', name: 'KCB Bank Kenya', currency: 'KES' },
    { code: '002', name: 'Equity Bank Kenya', currency: 'KES' },
    { code: '003', name: 'Safaricom', currency: 'KES' },
    { code: '004', name: 'Airtel Kenya', currency: 'KES' },
    { code: '005', name: 'Standard Chartered Bank Kenya', currency: 'KES' },
    { code: '006', name: 'NCBA Bank Kenya', currency: 'KES' },
    { code: '007', name: 'ABSA Bank Kenya', currency: 'KES' },
    { code: '008', name: 'Co-operative Bank', currency: 'KES' },
    { code: '009', name: 'Barclays Bank Kenya', currency: 'KES' },
    { code: '010', name: 'Diamond Trust Bank', currency: 'KES' },
  ],
  US: [
    { code: '021000021', name: 'Chase Bank', currency: 'USD' },
    { code: '011000015', name: 'Bank of America', currency: 'USD' },
    { code: '111000025', name: 'Wells Fargo', currency: 'USD' },
    { code: '061000052', name: 'US Bank', currency: 'USD' },
    { code: '091000022', name: 'Citibank', currency: 'USD' },
    { code: '011600033', name: 'TD Bank', currency: 'USD' },
    { code: '021001945', name: 'PNC Bank', currency: 'USD' },
    { code: '104000016', name: 'RBC Bank', currency: 'USD' },
  ],
  GB: [
    { code: 'BARC', name: 'Barclays Bank', currency: 'GBP' },
    { code: 'HBKAGB22', name: 'HSBC Bank UK', currency: 'GBP' },
    { code: 'LLOYSGB21', name: 'Lloyds Banking Group', currency: 'GBP' },
    { code: 'NWABGB22', name: 'NatWest Group', currency: 'GBP' },
    { code: 'MIDLGB22', name: 'Midland Bank', currency: 'GBP' },
    { code: 'GEBAGB2L', name: 'Nationwide Building Society', currency: 'GBP' },
    { code: 'BKCHUS33', name: 'Standard Chartered Bank', currency: 'GBP' },
  ],
  CA: [
    { code: '002', name: 'Royal Bank of Canada', currency: 'CAD' },
    { code: '010', name: 'Toronto Dominion Bank', currency: 'CAD' },
    { code: '016', name: 'Bank of Montreal', currency: 'CAD' },
    { code: '039', name: 'Bank of Nova Scotia', currency: 'CAD' },
    { code: '003', name: 'Bank of commerce', currency: 'CAD' },
    { code: '004', name: 'National Bank of Canada', currency: 'CAD' },
  ],
  IN: [
    { code: 'SBIN0000001', name: 'State Bank of India', currency: 'INR' },
    { code: 'HDFC0000053', name: 'HDFC Bank', currency: 'INR' },
    { code: 'ICIC0000001', name: 'ICICI Bank', currency: 'INR' },
    { code: 'AXIS0000001', name: 'Axis Bank', currency: 'INR' },
    { code: 'UTIB0000123', name: 'Axis Bank', currency: 'INR' },
    { code: 'IDIB000J001', name: 'IDBI Bank', currency: 'INR' },
  ],
  ZA: [
    { code: '250655', name: 'ABSA Bank South Africa', currency: 'ZAR' },
    { code: '260054', name: 'FirstRand Bank', currency: 'ZAR' },
    { code: '470010', name: 'Nedbank', currency: 'ZAR' },
    { code: '580105', name: 'Standard Bank', currency: 'ZAR' },
    { code: '632005', name: 'Bank of China', currency: 'ZAR' },
  ],
  TZ: [
    { code: '000001', name: 'National Bank of Tanzania', currency: 'TZS' },
    { code: '000002', name: 'Tanzania Post Bank', currency: 'TZS' },
    { code: '000003', name: 'CRDB Bank', currency: 'TZS' },
    { code: '000004', name: 'Azania Bank', currency: 'TZS' },
    { code: '000005', name: 'Bank of Asia Tanzania', currency: 'TZS' },
  ],
  ET: [
    { code: '01', name: 'National Bank of Ethiopia', currency: 'ETB' },
    { code: '02', name: 'Commercial Bank of Ethiopia', currency: 'ETB' },
    { code: '03', name: 'Addis International Bank', currency: 'ETB' },
    { code: '04', name: 'Abyssinia Bank', currency: 'ETB' },
  ],
  UG: [
    { code: '001', name: 'Bank of Uganda', currency: 'UGX' },
    { code: '002', name: 'CRDB Bank Uganda', currency: 'UGX' },
    { code: '003', name: 'Standard Chartered Bank', currency: 'UGX' },
    { code: '004', name: 'Barclays Bank Uganda', currency: 'UGX' },
    { code: '005', name: 'Centenary Bank', currency: 'UGX' },
  ],
};

export const COUNTRY_CURRENCIES: Record<CountryCode, string> = {
  NG: 'NGN',
  GH: 'GHS',
  KE: 'KES',
  US: 'USD',
  GB: 'GBP',
  CA: 'CAD',
  IN: 'INR',
  ZA: 'ZAR',
  TZ: 'TZS',
  ET: 'ETB',
  UG: 'UGX',
};

export const SUPPORTED_COUNTRIES = [
  { name: 'Nigeria', code: 'NG' },
  { name: 'Ghana', code: 'GH' },
  { name: 'Kenya', code: 'KE' },
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Canada', code: 'CA' },
  { name: 'India', code: 'IN' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'Tanzania', code: 'TZ' },
  { name: 'Ethiopia', code: 'ET' },
  { name: 'Uganda', code: 'UG' },
];
