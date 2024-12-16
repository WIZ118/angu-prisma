import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AddhouseComponent } from './admin/addhouse/addhouse.component';
import { UsersComponent } from './admin/users/users.component';
import { ManageHousesComponent } from './admin/manage-houses/manage-houses.component';
import { EditHouseComponent } from './admin/edit-house/edit-house.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'add-house', pathMatch: 'full' },
      { path: 'add-house', component: AddhouseComponent },
      { path: 'users', component: UsersComponent },
      { path: 'manage-houses', component: ManageHousesComponent },
      { path: 'edit-house/:id', component: EditHouseComponent },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
