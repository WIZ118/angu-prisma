import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [UserService],
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  signup() {
    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.userService
      .signup({ name: this.name, email: this.email, password: this.password })
      .subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (error) => {
          if (error.error && error.error.error === 'Email already exists') {
            this.errorMessage =
              'Email already exists. Please use a different email.';
          } else {
            this.errorMessage = 'Signup failed. Please try again.';
          }
          console.error('Signup error:', error);
        }
      );
  }
}
