import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Shared
import { NavbarComponent }      from './shared/navbar/navbar.component';
import { FooterComponent }      from './shared/footer/footer.component';
import { ToastComponent }       from './shared/toast/toast.component';
import { LoginModalComponent }  from './shared/login-modal/login-modal.component';

// Pages
import { HomeComponent }         from './pages/home/home.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { BookingComponent }      from './pages/booking/booking.component';
import { PaymentComponent }      from './pages/payment/payment.component';
import { SuccessComponent }      from './pages/success/success.component';
import { ProfileComponent }      from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ToastComponent,
    LoginModalComponent,
    HomeComponent,
    ServicesPageComponent,
    BookingComponent,
    PaymentComponent,
    SuccessComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
