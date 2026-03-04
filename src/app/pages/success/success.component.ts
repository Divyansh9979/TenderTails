import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  bookingId = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingId = sessionStorage.getItem('bookingId') || this.bookingService.generateBookingId();
  }
}
