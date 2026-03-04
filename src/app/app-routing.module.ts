import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }         from './pages/home/home.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { BookingComponent }      from './pages/booking/booking.component';
import { PaymentComponent }      from './pages/payment/payment.component';
import { SuccessComponent }      from './pages/success/success.component';
import { ProfileComponent }      from './pages/profile/profile.component';

const routes: Routes = [
  { path: '',          component: HomeComponent },
  { path: 'services',  component: ServicesPageComponent },
  { path: 'booking',   component: BookingComponent },
  { path: 'payment',   component: PaymentComponent },
  { path: 'success',   component: SuccessComponent },
  { path: 'profile',   component: ProfileComponent },
  { path: '**',        redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
