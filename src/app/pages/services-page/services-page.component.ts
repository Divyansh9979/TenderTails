import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { ToastService } from '../../services/toast.service';

interface Service {
  icon: string; title: string; desc: string;
  price: string; priceNote: string; rawPrice: number; badge?: string; badgeClass?: string;
}

interface ServiceCategory { label: string; icon: string; heading: string; services: Service[]; }

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent {
  categories: ServiceCategory[] = [
    {
      label: 'Grooming', icon: '✂️', heading: 'Grooming Services',
      services: [
        { icon:'🛁', title:'Basic Bath & Brush',   desc:'Shampoo, conditioner, blow dry, brushing, ear cleaning, nail clipping & paw massage.', price:'₹699',   priceNote:'Small / ₹899 Medium / ₹1,099 Large', rawPrice:699,  badge:'Most Booked' },
        { icon:'✂️', title:'Full Spa & Haircut',   desc:'Complete grooming with breed-specific styling, de-matting, de-shedding treatment.',    price:'₹1,299', priceNote:'Small / ₹1,599 Medium / ₹1,999 Large', rawPrice:1299, badge:'Popular', badgeClass:'popular' },
        { icon:'💅', title:'Nail Trim & Ear Clean', desc:'Quick essential care — professional nail trimming, ear cleaning and paw inspection.',  price:'₹349',   priceNote:'All sizes', rawPrice:349 },
      ]
    },
    {
      label: 'Veterinary', icon: '🩺', heading: 'Vet & Health Services',
      services: [
        { icon:'🩺', title:'General Consultation', desc:'Licensed vet visits home for full check-up, diagnosis, and medical advice.',           price:'₹999',  priceNote:'Per visit',           rawPrice:999,  badge:'Popular', badgeClass:'popular' },
        { icon:'💉', title:'Vaccination at Home',  desc:'All core and non-core vaccines administered safely at home by licensed vets.',         price:'₹799',  priceNote:'Excl. vaccine cost',  rawPrice:799  },
        { icon:'🦷', title:'Dental Cleaning',      desc:'Professional teeth cleaning, scaling and oral health check for your pet.',             price:'₹899',  priceNote:'All breeds',          rawPrice:899  },
      ]
    },
    {
      label: 'Training & Care', icon: '🎓', heading: 'Training & Home Care',
      services: [
        { icon:'🎓', title:'Obedience Training',     desc:'Certified trainers teach basic to advanced commands in your home environment.',  price:'₹1,499', priceNote:'Per 60-min session', rawPrice:1499, badge:'Popular', badgeClass:'popular' },
        { icon:'🏠', title:'Home Pet Sitting',       desc:'Trusted, background-verified sitters care for your pet in your own home.',       price:'₹599',   priceNote:'Per day',           rawPrice:599  },
        { icon:'🦮', title:'Daily Dog Walking',      desc:'GPS-tracked professional walks, twice daily, with post-walk reports & photos.',  price:'₹299',   priceNote:'Per walk (30 min)',  rawPrice:299  },
      ]
    }
  ];

  professionals = [
    { avatar:'👩‍🔧', name:'Sunita Rao',     role:'Senior Groomer',            rating:'4.97', reviews:'842',   jobs:'1,240 jobs done' },
    { avatar:'👨‍⚕️', name:'Dr. Karan Joshi', role:'Veterinarian · 7 yrs exp', rating:'4.98', reviews:'1,102', jobs:'2,350 home visits' },
    { avatar:'🧑‍🦱', name:'Rahul Verma',    role:'Dog Trainer · Certified',   rating:'4.95', reviews:'637',   jobs:'940 sessions done' },
    { avatar:'👩‍🦰', name:'Meena Pillai',   role:'Pet Sitter & Walker',       rating:'4.96', reviews:'784',   jobs:'3,100+ walks done' },
  ];

  constructor(private router: Router, private bookingService: BookingService, private toast: ToastService) {}

  bookService(svc: Service): void {
    this.bookingService.updateState({ selectedService: svc.title, selectedPrice: svc.rawPrice });
    this.toast.show(`Service selected: ${svc.title} 🐾`);
    this.router.navigate(['/booking']);
  }
}
