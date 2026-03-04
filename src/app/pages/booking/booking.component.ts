import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { ToastService } from '../../services/toast.service';

interface DateSlot { day: string; num: number; dateStr: string; disabled: boolean; }
interface SvcOption { id: string; icon: string; name: string; price: string; rawPrice: number; }

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  currentStep = 1;
  selectedSvcId = '';
  selectedPetType = '';
  selectedDate = '';
  selectedTime = '';
  promoApplied = false;
  promoCode = '';

  dateSlots: DateSlot[] = [];
  timeSlots = [
    { time: '9:00 AM', booked: false }, { time: '10:00 AM', booked: false },
    { time: '11:00 AM', booked: true  }, { time: '12:00 PM', booked: false },
    { time: '2:00 PM',  booked: false }, { time: '3:00 PM',  booked: true  },
    { time: '4:00 PM',  booked: false }, { time: '5:00 PM',  booked: false },
    { time: '6:00 PM',  booked: false }, { time: '7:00 PM',  booked: false },
  ];

  svcOptions: SvcOption[] = [
    { id:'s1', icon:'🛁', name:'Bath & Brush',    price:'from ₹699',   rawPrice:699  },
    { id:'s2', icon:'✂️', name:'Full Spa & Haircut', price:'from ₹1,299', rawPrice:1299 },
    { id:'s3', icon:'🩺', name:'Vet at Home',     price:'from ₹999',   rawPrice:999  },
    { id:'s4', icon:'🎓', name:'Dog Training',    price:'from ₹1,499', rawPrice:1499 },
    { id:'s5', icon:'🏠', name:'Pet Sitting',     price:'from ₹599',   rawPrice:599  },
    { id:'s6', icon:'🦮', name:'Dog Walking',     price:'from ₹299',   rawPrice:299  },
  ];

  petTypes = ['🐶 Dog', '🐱 Cat', '🐰 Rabbit', '🐦 Bird', '🐾 Other'];

  step1Form!: FormGroup;
  step2Form!: FormGroup;
  step3Form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public bookingService: BookingService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.buildDateSlots();
    this.initForms();
    // Pre-select if coming from services page
    const state = this.bookingService.getState();
    if (state.selectedService) {
      const found = this.svcOptions.find(s => s.name === state.selectedService);
      if (found) this.selectSvc(found);
    }
  }

  initForms(): void {
    this.step1Form = this.fb.group({ address: ['', Validators.required], petSize: ['', Validators.required] });
    this.step2Form = this.fb.group({ petName: ['', Validators.required], breed: [''], age: [''] });
    this.step3Form = this.fb.group({ ownerName: ['', Validators.required], ownerPhone: ['', Validators.required], ownerEmail: ['', [Validators.required, Validators.email]], specialInstructions: [''] });
  }

  buildDateSlots(): void {
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      this.dateSlots.push({
        day: days[d.getDay()], num: d.getDate(),
        dateStr: d.toLocaleDateString('en-IN', { day:'numeric', month:'short' }),
        disabled: i === 0
      });
    }
  }

  selectSvc(svc: SvcOption): void {
    this.selectedSvcId = svc.id;
    this.bookingService.updateState({ selectedService: svc.name, selectedPrice: svc.rawPrice });
  }

  selectDate(slot: DateSlot): void {
    if (slot.disabled) return;
    this.selectedDate = slot.dateStr;
    this.bookingService.updateState({ selectedDate: slot.dateStr });
  }

  selectTime(time: string): void {
    this.selectedTime = time;
    this.bookingService.updateState({ selectedTime: time });
  }

  selectPetType(pet: string): void {
    this.selectedPetType = pet;
    this.bookingService.updateState({ petType: pet });
  }

  nextStep(): void {
    if (this.currentStep === 1) {
      if (!this.selectedSvcId) { this.toast.show('Please select a service first!'); return; }
      if (this.step1Form.get('address')?.invalid) { this.toast.show('Please enter your address!'); return; }
    }
    if (this.currentStep === 2) {
      if (!this.selectedDate) { this.toast.show('Please select a date!'); return; }
      if (!this.selectedTime) { this.toast.show('Please select a time slot!'); return; }
      if (this.step2Form.get('petName')?.invalid) { this.toast.show('Please enter your pet\'s name!'); return; }
      this.bookingService.updateState({ petName: this.step2Form.value.petName });
    }
    this.currentStep++;
  }

  prevStep(): void { this.currentStep--; }

  applyPromo(): void {
    if (this.promoCode.toUpperCase() === 'PAWS20') {
      this.promoApplied = true;
      this.bookingService.updateState({ promoApplied: true, discount: 100 });
      this.toast.show('Promo code PAWS20 applied! ₹100 off 🎉');
    } else {
      this.toast.show('Invalid promo code. Try PAWS20!');
    }
  }

  proceedToPayment(): void {
    if (this.step3Form.invalid) { this.toast.show('Please fill in all required fields!'); return; }
    this.bookingService.updateState({
      ownerName: this.step3Form.value.ownerName,
      ownerPhone: this.step3Form.value.ownerPhone,
      ownerEmail: this.step3Form.value.ownerEmail,
    });
    this.router.navigate(['/payment']);
  }

  get state() { return this.bookingService.getState(); }
  get total()  { return this.bookingService.getTotal(); }
  get tax()    { return this.bookingService.getTax(); }

  // ===============================
// PRICING GETTERS
// ===============================

get selectedServiceObj(): SvcOption | null {
  return this.svcOptions.find(s => s.id === this.selectedSvcId) || null;
}

get serviceFee(): number {
  return this.selectedServiceObj?.rawPrice || 0;
}

get platformFee(): number {
  return 29;
}

get taxAmount(): number {
  return Math.round(this.serviceFee * 0.18);
}

get grandTotal(): number {
  const discount = this.promoApplied ? 100 : 0;
  return this.serviceFee + this.taxAmount + this.platformFee - discount;
}
}
