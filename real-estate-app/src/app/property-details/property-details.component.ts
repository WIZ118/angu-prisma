import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../user.service';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatCardModule],
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss'],
  providers: [UserService],
})
export class PropertyDetailsComponent implements OnInit {
  property: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    const propertyId = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getProperty(propertyId).subscribe((data: any) => {
      this.property = data;
    });
  }
}
