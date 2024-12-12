import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [UserService],
})
export class DashboardComponent implements OnInit {
  title = 'real-estate-app';
  houses: any[] = [];
  selectedFile: File | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getProperties().subscribe((data: any[]) => {
      this.houses = data;
    });
  }

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

    console.log('FormData:', formData);

    this.userService.createHouse(formData).subscribe(
      (house) => {
        console.log('House created successfully:', house);
        this.houses.push(house);
      },
      (error) => {
        console.error('Create house error:', error);
      }
    );
  }

  viewHouse(id: number) {
    this.router.navigate(['/property', id]);
  }

  editHouse(id: number) {
    this.router.navigate(['/edit-house', id]);
  }

  removeHouse(id: number) {
    this.userService.deleteHouse(id).subscribe(() => {
      this.houses = this.houses.filter((h) => h.id !== id);
    });
  }
}
