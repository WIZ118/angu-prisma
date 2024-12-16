import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-edit-house',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
  ],
  templateUrl: './edit-house.component.html',
  styleUrls: ['./edit-house.component.scss'],
  providers: [UserService],
})
export class EditHouseComponent implements OnInit {
  houseId: number;
  house: any = {};
  selectedFile: File | null = null;
  propertyType: string = 'For Sale'; // Default value

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.houseId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadHouse();
  }

  loadHouse() {
    this.userService.getProperty(this.houseId).subscribe((data) => {
      this.house = data;
      this.propertyType = this.house.type;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateHouse(
    title: string,
    description: string,
    price: string,
    location: string
  ) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('location', location);
    formData.append('type', this.propertyType); // Add type

    if (this.selectedFile) {
      formData.append('picture', this.selectedFile);
    }

    this.userService.updateHouse(this.houseId, formData).subscribe(
      (house) => {
        console.log('House updated successfully:', house);
        this.router.navigate(['/admin/manage-houses']);
      },
      (error) => {
        console.error('Update house error:', error);
      }
    );
  }
}
