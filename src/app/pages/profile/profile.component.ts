import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

type ProfileTab = 'bookings' | 'pets' | 'account' | 'saved';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  activeTab: ProfileTab = 'bookings';

  bookings = [
    { icon:'🛁', service:'Bath & Brush – Bruno',          detail:'Sunita Rao · Mar 12, 2025 · 10:00 AM', status:'upcoming',   price:'₹699'   },
    { icon:'🩺', service:'Vet Consultation – Whiskers',   detail:'Dr. Karan Joshi · Feb 28, 2025',        status:'completed',  price:'₹999'   },
    { icon:'🎓', service:'Obedience Training – Bruno',    detail:'Rahul Verma · Feb 14, 2025',            status:'completed',  price:'₹1,499' },
    { icon:'✂️', service:'Full Spa & Haircut – Bruno',    detail:'Sunita Rao · Jan 20, 2025',             status:'cancelled',  price:'₹1,299' },
  ];

  pets = [
    { emoji:'🐕', name:'Bruno',   desc:'Golden Retriever · 3 yrs · Male' },
    { emoji:'🐱', name:'Whiskers', desc:'Persian Cat · 2 yrs · Female' },
  ];

  statusClass(status: string): string {
    return status === 'upcoming' ? 'upcoming' : status === 'completed' ? 'completed' : 'cancelled';
  }

  constructor(private router: Router, private toast: ToastService) {}

  signOut(): void {
    this.toast.show('Logged out successfully');
    this.router.navigate(['/']);
  }

  addPet(): void { this.toast.show('Add Pet feature coming soon!'); }
  saveAccount(): void { this.toast.show('Profile updated successfully! ✅'); }
}
