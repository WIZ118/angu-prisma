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
  constructor(public router: Router) {}

  // Navigate to specific admin pages
  navigateTo(path: string) {
    this.router.navigate([`/admin/${path}`]);
  }

  // Navigate back to home
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  // Logout function
  logout() {
    console.log('Logging out...');
    alert('Logged out');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
