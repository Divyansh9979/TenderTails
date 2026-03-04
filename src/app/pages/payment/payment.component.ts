import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  payMethod: 'card' | 'upi' | 'wallet' | 'nb' = 'card';
  processing = false;

  // Card fields
  cardNum = ''; cardName = ''; cardExp = ''; cardCvv = ''; saveCard = false;
  cardNumDisplay = '•••• •••• •••• ••••';
  cardNameDisplay = 'YOUR NAME';
  cardExpDisplay  = 'MM / YY';

  // UPI
  upiId = '';
  upiApps = [
    { icon: '🟡', name: 'Google Pay' },
    { icon: '🔵', name: 'PhonePe' },
    { icon: '🟠', name: 'Paytm' },
    { icon: '🔴', name: 'BHIM' },
  ];

  wallets = [
    { icon: '🔵', name: 'Paytm Wallet' },
    { icon: '🟠', name: 'Amazon Pay' },
    { icon: '🟢', name: 'Freecharge' },
    { icon: '🟣', name: 'Mobikwik' },
  ];

  banks = [
    { icon: '🏦', name: 'SBI Net Banking' }, { icon: '🏦', name: 'HDFC Bank' },
    { icon: '🏦', name: 'ICICI Bank' },      { icon: '🏦', name: 'Axis Bank' },
    { icon: '🏦', name: 'Kotak Bank' },      { icon: '🏦', name: 'Yes Bank' },
  ];

  constructor(
    public bookingService: BookingService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    if (!this.bookingService.getState().selectedService) {
      this.router.navigate(['/booking']);
    }
  }

  get state() { return this.bookingService.getState(); }
  get fee()   { return this.bookingService.getServiceFee(); }
  get tax()   { return this.bookingService.getTax(); }
  get disc()  { return this.bookingService.getDiscount(); }
  get total() { return this.bookingService.getTotal(); }
  get emi()   { return Math.round(this.total / 3); }

  onCardNumInput(val: string): void {
    const clean = val.replace(/\D/g, '').substring(0, 16);
    const formatted = clean.match(/.{1,4}/g)?.join(' ') || clean;
    this.cardNum = formatted;
    const masked = formatted.replace(/\d(?=.{5})/g, '•');
    this.cardNumDisplay = masked || '•••• •••• •••• ••••';
  }

  onCardNameInput(val: string): void {
    this.cardName = val;
    this.cardNameDisplay = val.toUpperCase() || 'YOUR NAME';
  }

  onCardExpInput(val: string): void {
    const clean = val.replace(/\D/g, '').substring(0, 4);
    this.cardExp = clean.length >= 2 ? clean.substring(0,2) + ' / ' + clean.substring(2) : clean;
    this.cardExpDisplay = this.cardExp || 'MM / YY';
  }

  processPayment(): void {
    this.processing = true;
    setTimeout(() => {
      this.processing = false;
      const id = this.bookingService.generateBookingId();
      sessionStorage.setItem('bookingId', id);
      this.router.navigate(['/success']);
    }, 2500);
  }
}
