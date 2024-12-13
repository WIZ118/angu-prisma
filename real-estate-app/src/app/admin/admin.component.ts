import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(public router: Router) {} // Make Router instance PUBLIC

  logout() {
    console.log('Logging out...');
    alert('Logged out');
    this.router.navigate(['/login']); // Redirect to login
  }
}
