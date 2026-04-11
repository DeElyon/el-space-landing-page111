# Wallet Implementation Quick Guide

## 🎯 How It Works

### Funding Wallet (Korapay)
```
User enters amount
    ↓
Sees instructions:
  1. Full name & email will be pre-filled
  2. Must enter SAME amount on checkout
  3. Auto-redirect back after payment
    ↓
Clicks "Continue to Korapay Checkout"
    ↓
Redirected to: https://checkout.korapay.com/pay/{reference}
    ↓
User completes payment
    ↓
Auto-redirect back to app
    ↓
Wallet updated with funds
```

### Bank Withdrawal
```
User clicks "Withdraw"
    ↓
Selects "Bank Transfer" tab
    ↓
Enters amount (max: available balance)
    ↓
Selects country
    ↓
Bank list populates automatically
    ↓
Selects bank
    ↓
Enters account holder name
    ↓
Enters account number
    ↓
Clicks "Confirm Bank Withdrawal"
    ↓
API validates and creates withdrawal request
    ↓
Amount placed on hold pending processing
    ↓
User sees: "Bank withdrawal request submitted!"
    ↓
Transaction appears in history with "pending" status
```

### Crypto Withdrawal
```
User clicks "Withdraw"
    ↓
Selects "Cryptocurrency" tab
    ↓
Enters amount (max: available balance)
    ↓
Selects crypto: USDT / USDC / SOL / ZEC
    ↓
Network list populates based on crypto
    ↓
Selects network (Ethereum, Polygon, Solana, etc.)
    ↓
Enters wallet address
⚠️  Sees warning: "Double-check address - cannot be reversed"
    ↓
Enters full name
    ↓
Enters email
    ↓
Clicks "Confirm Crypto Withdrawal"
    ↓
API validates address format and amount
    ↓
API creates withdrawal request with crypto details
    ↓
User sees: "Crypto withdrawal request submitted! Processing 5-30 minutes"
    ↓
Transaction appears in history
    ↓
Crypto processed to wallet according to network
```

---

## 📊 Supported Countries & Banks

### Supported Countries
1. Nigeria (NGN)
2. Ghana (GHS)
3. Kenya (KES)
4. United States (USD)
5. United Kingdom (GBP)
6. Canada (CAD)
7. India (INR)
8. South Africa (ZAR)
9. Tanzania (TZS)
10. Ethiopia (ETB)
11. Uganda (UGX)

### Sample Banks
- **Nigeria**: GTBank, Access Bank, UBA, Zenith Bank, etc. (14 banks)
- **Kenya**: KCB, Equity, Safaricom, Airtel, etc. (10 banks)
- **US**: Chase, Bank of America, Wells Fargo, Citibank, etc. (8 banks)
- **UK**: HSBC, Barclays, Lloyds, NatWest, etc. (7 banks)

---

## 💰 Crypto Currencies

| Token | Symbol | Network | Min Withdrawal | Fee |
|-------|--------|---------|---------------|----|
| Tether USD | USDT | Ethereum/Polygon/BSC/Solana | $10 | $5 flat |
| USD Coin | USDC | Ethereum/Polygon/BSC/Solana | $10 | $5 flat |
| Solana | SOL | Solana | 0.1 | 0.025% |
| Zcash | ZEC | Zcash | 0.01 | $0.001 |

### Network Processing Times
- **Ethereum**: 10-30 minutes
- **Polygon**: 5-20 minutes
- **Binance Smart Chain (BSC)**: 10-30 minutes
- **Solana**: 5-15 minutes
- **Zcash**: 20-60 minutes

---

## 🔌 API Endpoints

### Get Wallet
```
GET /api/wallet?userId={userId}

Response:
{
  "success": true,
  "wallet": {
    "balance": 1500,
    "pending_balance": 200,
    "total_earned": 5000,
    "total_withdrawn": 3300,
    "available_for_withdrawal": 1300,
    "currency": "USD"
  }
}
```

### Get Transactions
```
GET /api/wallet?userId={userId}&action=transactions

Response:
{
  "success": true,
  "transactions": [
    {
      "id": "tx-123",
      "type": "earning",
      "amount": 500,
      "description": "Project: Website Redesign",
      "status": "completed",
      "date": "2024-01-15T10:30:00Z",
      "metadata": { ... }
    }
  ],
  "total": 25
}
```

### Bank Withdrawal
```
POST /api/wallet

{
  "type": "withdraw",
  "userId": "user-123",
  "amount": 1000,
  "method": "bank",
  "accountDetails": {
    "country": "NG",
    "bank_code": "044",
    "account_number": "1234567890",
    "account_name": "John Doe"
  }
}

Response:
{
  "success": true,
  "message": "Withdrawal request created",
  "withdrawal": {
    "id": "wd-123",
    "amount": 1000,
    "method": "bank",
    "status": "pending",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Crypto Withdrawal
```
POST /api/wallet

{
  "type": "withdraw",
  "userId": "user-123",
  "amount": 500,
  "method": "crypto",
  "accountDetails": {
    "crypto_type": "USDT",
    "network": "ethereum",
    "wallet_address": "0x1234567890abcdef...",
    "full_name": "John Doe",
    "email": "john@example.com"
  }
}

Response:
{
  "success": true,
  "message": "Crypto withdrawal request submitted",
  "withdrawal": {
    "id": "wd-124",
    "amount": 500,
    "method": "crypto",
    "status": "pending",
    "processingTime": "5-30 minutes"
  }
}
```

---

## 🗂️ File Structure

```
lib/
├── banks.ts              # Country banks and currencies
├── crypto.ts             # Crypto currencies and networks
├── korapay.ts            # Korapay integration
└── supabase.ts           # Database functions (includes getAllUserPayments)

app/
├── wallet/
│   └── page.tsx          # Updated wallet page with bank/crypto withdrawal
├── milestones/
│   └── page.tsx          # Updated without mock data
└── api/
    ├── wallet/
    │   └── route.ts      # Updated to fetch real transactions
    └── payments/
        └── korapay.ts    # Korapay payment processing
```

---

## ✨ Key Features

### Wallet Page UI Improvements
- ✅ Tabbed interface (Bank Transfer vs Cryptocurrency)
- ✅ Real-time balance display (from database)
- ✅ Transaction history sorted by date
- ✅ Status badges for each transaction
- ✅ Clear form validation
- ✅ Loading states
- ✅ Error handling with toast notifications

### Security Features
- ✅ User authentication check
- ✅ Amount validation (min/max)
- ✅ Wallet address irreversibility warning
- ✅ Transaction verification
- ✅ Account number masking (when needed)

### User Experience
- ✅ Checkout instructions inline
- ✅ Pre-filled email and name for better UX
- ✅ Automatic network selection based on crypto
- ✅ Dynamic bank list updates
- ✅ Real-time validation feedback
- ✅ Processing time transparency

---

## 🧪 Testing Scenarios

### Test Funding
1. Log in to app
2. Go to Wallet page
3. Click "Fund Wallet"
4. Read instructions
5. Enter amount: $50
6. Verify email/name pre-filled in instructions
7. Click "Continue to Korapay Checkout"
8. Should redirect to Korapay

### Test Bank Withdrawal
1. Go to Wallet
2. Click "Withdraw"
3. Select "Bank Transfer"
4. Enter amount: $100
5. Select country: "Nigeria"
6. Wait for banks to load
7. Select bank: "GTBank"
8. Enter account name: "Test User"
9. Enter account number: "1234567890"
10. Click "Confirm"
11. Check success message
12. Verify transaction in history

### Test Crypto Withdrawal
1. Go to Wallet
2. Click "Withdraw"
3. Select "Cryptocurrency"
4. Enter amount: $50
5. Select crypto: "USDT"
6. Wait for networks to load
7. Select network: "Ethereum"
8. Enter wallet address (must be valid ETH address)
9. Enter name and email
10. Click "Confirm"
11. Check success message with processing time
12. Verify transaction in history

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Environment variables set for Korapay
- [ ] Database tables created (payments, wallet, users)
- [ ] Supabase keys configured
- [ ] CORS policies updated if needed
- [ ] Email service configured (if needed for receipts)
- [ ] Crypto address validation configured
- [ ] Bank code validation for each country
- [ ] Load testing performed
- [ ] Error logging configured
- [ ] Webhook handlers for payment callbacks

---

## 📞 Support & Troubleshooting

### Common Issues

**"User ID is required"**
- Solution: Ensure user is logged in before accessing wallet

**"Insufficient balance"**
- Solution: Withdraw amount is greater than available balance

**"Invalid withdrawal amount"**
- Solution: Amount must be > 0 and ≤ available balance

**"Please fill in all fields"**
- Solution: Complete all required fields in withdrawal form

**"Failed to fetch wallet data"**
- Solution: Check internet connection and try again

### Debug Mode
Add to browser console:
```javascript
localStorage.setItem('userId', 'your-user-id');
localStorage.setItem('email', 'your-email@example.com');
localStorage.setItem('fullName', 'Your Full Name');
```

Then refresh and test wallet features.

---

## 📈 Future Enhancements

- [ ] Add withdrawal history details modal
- [ ] Add payment method edit functionality
- [ ] Add recurring funding setup
- [ ] Add transaction proof/receipt download
- [ ] Add spending analytics dashboard
- [ ] Add scheduled withdrawals
- [ ] Add multi-currency support
- [ ] Add payment method favorites
- [ ] Add transaction notes/tags
- [ ] Add payment dispute resolution UI
