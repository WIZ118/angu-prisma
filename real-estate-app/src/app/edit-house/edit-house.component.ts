import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../user.service';

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
  ],
  templateUrl: './edit-house.component.html',
  styleUrls: ['./edit-house.component.scss'],
  providers: [UserService],
})
export class EditHouseComponent implements OnInit {
  house: any = {};
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    const houseId = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getProperty(houseId).subscribe((data: any) => {
      this.house = data;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateHouse() {
    const formData = new FormData();
    formData.append('title', this.house.title || '');
    formData.append('description', this.house.description || '');
    formData.append(
      'price',
      this.house.price ? this.house.price.toString() : '0'
    );
    formData.append('location', this.house.location || '');
    if (this.selectedFile) {
      formData.append('picture', this.selectedFile);
    } else {
      formData.append('picture', this.house.picture || '');
    }

    console.log('FormData:', formData);

    this.userService.updateHouse(this.house.id, formData).subscribe(
      () => {
        console.log('House updated successfully');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Update house error:', error);
      }
    );
  }
}
