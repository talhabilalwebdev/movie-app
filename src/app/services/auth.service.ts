import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import usersData from '../../assets/users.json';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  constructor(private router: Router) {
    // Initialize isLoggedIn from localStorage on service creation
    this.isLoggedIn = !!localStorage.getItem('currentUser');
  }

  login(username: string, password: string): boolean {
    const user = usersData.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      this.isLoggedIn = true;
      localStorage.setItem('currentUser', JSON.stringify(user)); // Persist user
      this.router.navigate(['/movies']);
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('currentUser'); // Clear stored user
    this.router.navigate(['/login']);
  }

  getAuthStatus(): boolean {
    // Always check localStorage for current status
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser() {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }
}
