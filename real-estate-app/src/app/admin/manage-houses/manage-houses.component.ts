import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-manage-houses',
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
  templateUrl: './manage-houses.component.html',
  styleUrls: ['./manage-houses.component.scss'],
  providers: [UserService],
})
export class ManageHousesComponent implements OnInit {
  houses: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadHouses();
  }

  loadHouses() {
    this.userService.getProperties().subscribe((data: any[]) => {
      this.houses = data;
    });
  }

  viewHouse(id: number) {
    this.router.navigate(['/property', id]);
  }

  editHouse(id: number) {
    this.router.navigate(['/admin/edit-house', id]);
  }

  removeHouse(id: number) {
    this.userService.deleteHouse(id).subscribe(() => {
      this.houses = this.houses.filter((h) => h.id !== id);
    });
  }
}
