import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
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
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService],
})
export class HomeComponent implements OnInit {
  properties: any[] = [];
  filteredProperties: any[] = []; // Filtered list for display

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getProperties().subscribe((data: any[]) => {
      this.properties = data;
      this.filteredProperties = [...this.properties]; // Initialize filtered list
    });
  }

  searchProperties(query: string) {
    const lowerCaseQuery = query.toLowerCase();
    this.filteredProperties = this.properties.filter((property) =>
      property.title.toLowerCase().includes(lowerCaseQuery)
    );
  }

  filterProperties(type: string) {
    if (type === 'all') {
      this.filteredProperties = [...this.properties];
    } else {
      this.filteredProperties = this.properties.filter(
        (property) => property.type === type
      );
    }
  }
}
