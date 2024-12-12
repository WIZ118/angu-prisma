import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { EditHouseComponent } from './edit-house/edit-house.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'property/:id',
    component: PropertyDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-house/:id',
    component: EditHouseComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'login' },
];
