import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  pricingTier: 'standard' | 'premium' = 'standard';
  monitoringPlan: 'hourly' | 'daily' | 'monthly' = 'monthly';

  groomingServices = [
    { icon: '🛁', name: 'Bath & Blow-Dry', price: '₹699', desc: 'Shampoo, conditioner, blow-dry & brush out' },
    { icon: '✂️', name: 'Full Haircut & Style', price: '₹1,099', desc: 'Breed-specific trim, tidy & finish' },
    { icon: '💅', name: 'Nail Trim', price: '₹249', desc: 'Clip, file & paw pad check' },
    { icon: '👂', name: 'Ear Cleaning', price: '₹199', desc: 'Gentle ear flush & inspection' },
    { icon: '🦷', name: 'Teeth Brushing', price: '₹349', desc: 'Dental brush & breath freshener' },
    { icon: '🪮', name: 'De-shedding Treatment', price: '₹599', desc: 'Deep undercoat removal & coat mask' },
  ];

  packages = {
    standard: {
      label: 'Standard', price: '₹1,299', duration: '90 min',
      color: 'blue',
      includes: ['Bath & Blow-Dry', 'Nail Trim', 'Ear Cleaning', 'Bandana or bow finish'],
      excludes: ['Haircut & Styling', 'De-shedding Treatment', 'Teeth Brushing', 'Aromatherapy coat spray']
    },
    premium: {
      label: 'Premium', price: '₹2,299', duration: '150 min',
      color: 'navy',
      includes: ['Everything in Standard', 'Haircut & Styling', 'Teeth Brushing', 'De-shedding Treatment', 'Aromatherapy coat spray', 'Post-service report card'],
      excludes: []
    }
  };

  monitoringPlans = [
    { key: 'hourly', label: 'Hourly Check-ins', price: '₹899', unit: '/day', desc: 'Professional visits every 2 hours for feeding, play & updates.', features: ['Every 2-hr visit', 'Photo updates', 'Feeding & water check', 'Playtime included'], badge: null },
    { key: 'daily',  label: 'Daily Visits',     price: '₹399', unit: '/day', desc: 'One dedicated 60-min visit per day with activity report.', features: ['1 visit/day (60 min)', 'Activity report', 'Feeding & water check', 'SMS update'], badge: null },
    { key: 'monthly', label: 'Monthly Plan',    price: '₹6,999', unit: '/mo', desc: 'Unlimited daily visits — the smart choice for working pet parents.', features: ['Unlimited daily visits', 'Real-time GPS tracking', 'Vet teleconsult (2/mo)', 'Priority scheduling', 'Monthly health summary'], badge: 'Best Value' },
  ];

  testimonials = [
    { text: '"TenderTails transformed Bruno\'s grooming experience. He actually gets excited now instead of hiding! The Premium package is absolutely worth it."', name: 'Priya Sharma', pet: 'Bruno – Golden Retriever', avatar: '👩', stars: 5 },
    { text: '"The monthly monitoring plan is a lifesaver. Real-time tracking and vet teleconsults give me total peace of mind when I travel for work."', name: 'Arjun Mehta', pet: 'Whiskers – Persian Cat', avatar: '👨', stars: 5 },
    { text: '"A-la-carte is amazing — I only needed a nail trim, and it was so easy to just book that one thing without paying for a full package."', name: 'Neha Kapoor', pet: 'Coco – Beagle', avatar: '👩‍🦱', stars: 5 },
  ];

  constructor(private router: Router, private bookingService: BookingService, private toast: ToastService) {}

  bookPackage(tier: 'standard' | 'premium'): void {
    const pkg = this.packages[tier];
    this.bookingService.updateState({ selectedService: `${pkg.label} Grooming Package`, selectedPrice: parseInt(pkg.price.replace(/[₹,]/g,'')) });
    this.toast.show(`${pkg.label} Package selected 🐾`);
    this.router.navigate(['/booking']);
  }

  bookMonitoring(plan: any): void {
    this.bookingService.updateState({ selectedService: `Monitoring – ${plan.label}`, selectedPrice: parseInt(plan.price.replace(/[₹,]/g,'')) });
    this.toast.show(`${plan.label} selected ✅`);
    this.router.navigate(['/booking']);
  }

  bookGroomingItem(item: any): void {
    this.bookingService.updateState({ selectedService: item.name, selectedPrice: parseInt(item.price.replace(/[₹,]/g,'')) });
    this.toast.show(`${item.name} added 🐾`);
    this.router.navigate(['/booking']);
  }
}
