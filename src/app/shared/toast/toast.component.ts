import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  template: `<div class="toast" [class.show]="visible">{{ message }}</div>`,
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  message = '';
  visible = false;
  private sub!: Subscription;
  private timeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.sub = this.toastService.message$.subscribe(msg => {
      this.message = msg;
      this.visible = true;
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => { this.visible = false; }, 3000);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    if (this.timeout) clearTimeout(this.timeout);
  }
}
