import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    private router: Router,
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer
  ) {
    matIconRegistry.addSvgIcon(
      'home',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/home.svg')
    );
    matIconRegistry.addSvgIcon(
      'dashboard',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/dashboard.svg')
    );
    matIconRegistry.addSvgIcon(
      'admin_panel_settings',
      domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/admin_panel_settings.svg'
      )
    );
    matIconRegistry.addSvgIcon(
      'logout',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/logout.svg')
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
