import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit, OnDestroy {
  isOpen = false;
  activeTab: 'login' | 'signup' = 'login';
  private sub!: Subscription;

  constructor(
    private modalService: ModalService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.modalService.isOpen$.subscribe(open => { this.isOpen = open; });
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  close(): void { this.modalService.close(); }

  onOverlayClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) this.close();
  }

  socialLogin(provider: string): void {
    this.close();
    this.toastService.show(`Signed in with ${provider} ✅`);
    this.router.navigate(['/profile']);
  }

  submit(): void {
    this.close();
    this.toastService.show('Welcome to PawCare! 🐾');
    this.router.navigate(['/profile']);
  }
}
