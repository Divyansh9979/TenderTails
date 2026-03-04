import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuOpen = false;
  constructor(public router: Router, private modalService: ModalService) {}
  openLogin(): void { this.menuOpen = false; this.modalService.open(); }
}
