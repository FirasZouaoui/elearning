import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { login } from 'models/login';


import { AuthService } from 'Services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const dto: login = {
      username: this.email,
      password: this.password
    };

    this.authService.login(dto).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token, res.id, res.roles);
        this.router.navigate(['/']);
      },
      error: () => {
        this.errorMessage = 'Login failed. Check credentials.';
      }
    });
  }
}
