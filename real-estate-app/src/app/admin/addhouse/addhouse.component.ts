import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-addhouse',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './addhouse.component.html',
  styleUrls: ['./addhouse.component.scss'],
  providers: [UserService],
})
export class AddhouseComponent {
  selectedFile: File | null = null;
  propertyType: string = 'For Sale'; // Default value

  constructor(private userService: UserService, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  createHouse(
    title: string,
    description: string,
    price: string,
    location: string
  ) {
    if (!this.selectedFile) {
      alert('Please select a picture.');
      return;
    }

    const ownerId = this.userService.getCurrentUserId(); // Retrieve the current user ID
    if (ownerId === 0) {
      alert('User not logged in.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('location', location);
    formData.append('picture', this.selectedFile);
    formData.append('ownerId', ownerId.toString());
    formData.append('type', this.propertyType); // Add type

    console.log('FormData:', formData);

    this.userService.createHouse(formData).subscribe(
      (house) => {
        console.log('House created successfully:', house);
        this.router.navigate(['/admin/manage-houses']);
      },
      (error) => {
        console.error('Create house error:', error);
      }
    );
  }
}
