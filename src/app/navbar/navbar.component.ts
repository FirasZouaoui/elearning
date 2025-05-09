import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'Services/auth-service.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public auth: AuthService, private router: Router) {}

  get isAdmin(): boolean {
    return this.auth.userRoles.includes('Admin');
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
