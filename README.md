# 🐾 PawCare — Angular Pet Services Platform

A full-featured, multi-page pet homecare & grooming service platform built with **Angular 17**, modelled after Urban Company.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ ([nodejs.org](https://nodejs.org))
- Angular CLI 17 (`npm install -g @angular/cli`)

### Installation
```bash
# 1. Navigate to project folder
cd pawcare

# 2. Install dependencies
npm install

# 3. Start the development server
ng serve

# 4. Open in browser
# http://localhost:4200
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── services/
│   │   ├── booking.service.ts   ← Shared booking state (RxJS BehaviorSubject)
│   │   ├── toast.service.ts     ← Global toast notifications
│   │   └── modal.service.ts     ← Login modal open/close
│   │
│   ├── shared/
│   │   ├── navbar/              ← Sticky navbar + mobile hamburger menu
│   │   ├── footer/              ← Site footer with router links
│   │   ├── toast/               ← Global toast component
│   │   └── login-modal/         ← Sign In / Register modal
│   │
│   ├── pages/
│   │   ├── home/                ← Landing page
│   │   ├── services-page/       ← All services + professionals
│   │   ├── booking/             ← 3-step booking flow (ReactiveFormsModule)
│   │   ├── payment/             ← Card / UPI / Wallet / Net Banking
│   │   ├── success/             ← Booking confirmation
│   │   └── profile/             ← User account tabs
│   │
│   ├── app.module.ts            ← NgModule (declarations, imports)
│   ├── app-routing.module.ts    ← Route definitions
│   └── app.component.html       ← Root: navbar + router-outlet + modal + toast
│
└── styles.scss                  ← Global CSS variables, buttons, form styles
```

---

## 🗺️ Routes

| URL          | Component             | Description                  |
|--------------|----------------------|------------------------------|
| `/`          | `HomeComponent`       | Landing page                 |
| `/services`  | `ServicesPageComponent` | All service categories     |
| `/booking`   | `BookingComponent`    | 3-step booking form          |
| `/payment`   | `PaymentComponent`    | Payment gateway (sample)     |
| `/success`   | `SuccessComponent`    | Booking confirmation         |
| `/profile`   | `ProfileComponent`    | User account & bookings      |

---

## 🧩 Key Angular Concepts Used

| Feature               | Where Used                          |
|-----------------------|-------------------------------------|
| `RouterModule`        | Navigation between all pages        |
| `routerLink`          | Navbar, service cards, CTAs         |
| `routerLinkActive`    | Active state styling in navbar      |
| `ReactiveFormsModule` | Booking form (3 `FormGroup`s)       |
| `FormsModule`         | Payment inputs (`ngModel`)          |
| `BehaviorSubject`     | BookingService shared state         |
| `@Injectable`         | BookingService, ToastService        |
| `*ngFor`              | Service cards, bookings list, etc.  |
| `*ngIf`               | Step panels, payment method panels  |
| `[ngClass]`           | Booking status badges               |

---

## 💳 Payment Gateway (Sample)

The payment page (`/payment`) simulates a real gateway with:
- **Credit/Debit Card** — animated card preview, live input formatting
- **UPI** — ID input + GPay, PhonePe, Paytm, BHIM quick-select
- **Wallets** — Paytm, Amazon Pay, Freecharge, Mobikwik
- **Net Banking** — SBI, HDFC, ICICI, Axis, Kotak, Yes Bank

**To integrate a real gateway**, replace `processPayment()` in `payment.component.ts` with:
```typescript
// Razorpay example
processPayment(): void {
  const options = {
    key: 'YOUR_RAZORPAY_KEY',
    amount: this.total * 100,  // in paise
    currency: 'INR',
    name: 'PawCare',
    description: this.state.selectedService,
    handler: (response: any) => {
      // Verify payment on your backend
      this.router.navigate(['/success']);
    },
    prefill: {
      name: this.state.ownerName,
      email: this.state.ownerEmail,
      contact: this.state.ownerPhone,
    },
    theme: { color: '#e8722a' }
  };
  const rzp = new (window as any).Razorpay(options);
  rzp.open();
}
```

**Popular Indian Payment Gateways:**
- [Razorpay](https://razorpay.com/docs/) — Most popular, free sandbox
- [PayU](https://developer.payubiz.in/) — Supports EMI & UPI
- [Cashfree](https://docs.cashfree.com/) — Fast settlement

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|---------------|
| > 900px    | Full desktop grid layouts |
| 600–900px  | 2-column grids, stacked booking/payment |
| < 600px    | Single column, hamburger menu |

---

## 🎨 Design System

All CSS variables defined in `src/styles.scss`:
```scss
--orange:    #e8722a   // Primary CTA color
--brown:     #4a2c0a   // Primary text / headings
--cream:     #fdf6ee   // Page background
--warm:      #f5e6d3   // Card backgrounds
--green:     #3d6b4f   // Success / eco accents
```

Fonts: **Playfair Display** (headings) + **DM Sans** (body)
