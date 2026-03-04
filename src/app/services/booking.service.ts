import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface BookingState {
  selectedService: string;
  selectedPrice: number;
  selectedDate: string;
  selectedTime: string;
  petName: string;
  petType: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  address: string;
  promoApplied: boolean;
  discount: number;
}

const initialState: BookingState = {
  selectedService: '',
  selectedPrice: 0,
  selectedDate: '',
  selectedTime: '',
  petName: '',
  petType: '',
  ownerName: '',
  ownerPhone: '',
  ownerEmail: '',
  address: '',
  promoApplied: false,
  discount: 0
};

@Injectable({ providedIn: 'root' })
export class BookingService {
  private stateSubject = new BehaviorSubject<BookingState>({ ...initialState });
  state$ = this.stateSubject.asObservable();

  getState(): BookingState {
    return { ...this.stateSubject.value };
  }

  updateState(partial: Partial<BookingState>): void {
    this.stateSubject.next({ ...this.stateSubject.value, ...partial });
  }

  reset(): void {
    this.stateSubject.next({ ...initialState });
  }

  getServiceFee(): number {
    return this.stateSubject.value.selectedPrice || 0;
  }

  getPlatformFee(): number {
    return 29;
  }

  getTax(): number {
    return Math.round((this.getServiceFee() + this.getPlatformFee()) * 0.18);
  }

  getDiscount(): number {
    return this.stateSubject.value.promoApplied ? 100 : 0;
  }

  getTotal(): number {
    return this.getServiceFee() + this.getPlatformFee() + this.getTax() - this.getDiscount();
  }

  generateBookingId(): string {
    return 'PWC-2025-' + Math.floor(10000 + Math.random() * 90000);
  }
}
