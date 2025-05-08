// src/app/services/auth-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { login } from '../models/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:5287/api/Account';
  private jwtHelper = new JwtHelperService();
  public isAuth = false;
  public userRoles: string[] = [];
  public userId: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }

  login(loginDto: login) {
    return this.http.post<any>(`${this.baseUrl}/Login`, loginDto);
  }

  saveToken(token: string, userId: string, roles: string[]) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('roles', JSON.stringify(roles));

    this.userId = userId;
    this.userRoles = roles;
    this.isAuth = true;
  }

  logout() {
    localStorage.clear();
    this.isAuth = false;
    this.userId = null;
    this.userRoles = [];
  }

  private loadUserFromStorage() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const roles = localStorage.getItem('roles');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.isAuth = true;
      this.userId = userId;
      this.userRoles = roles ? JSON.parse(roles) : [];
    }
  }
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

}
