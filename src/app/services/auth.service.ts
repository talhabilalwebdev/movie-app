import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import usersData from '../../assets/users.json';

export interface User {
  username: string;
  password: string;
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  constructor(private router: Router) {
    // Initialize users in localStorage if not already
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(usersData));
    }

    // Initialize isLoggedIn from localStorage
    this.isLoggedIn = !!localStorage.getItem('currentUser');
  }

  // LOGIN
  login(username: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      const token = this.generateToken(user.username);
      const currentUser = { ...user, token };
      this.isLoggedIn = true;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.router.navigate(['/movies']);
      return true;
    }
    return false;
  }

  // REGISTER
  register(username: string, password: string): { success: boolean; message: string } {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if username already exists
    if (users.some(u => u.username === username)) {
      return { success: false, message: 'Username already exists' };
    }

    // Add new user
    const newUser: User = { username, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Auto-login after registration
    const token = this.generateToken(username);
    const currentUser: User = { ...newUser, token };
    this.isLoggedIn = true;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    this.router.navigate(['/movies']);

    return { success: true, message: 'Registration successful' };
  }

  // LOGOUT
  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  // AUTH STATUS
  getAuthStatus(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  // GET CURRENT USER
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  // FAKE JWT TOKEN GENERATOR
  private generateToken(username: string): string {
    // Simple base64 encoding with expiration timestamp
    return btoa(JSON.stringify({ username, exp: Date.now() + 3600 * 1000 }));
  }

  // OPTIONAL: validate token expiration
  validateToken(): boolean {
    const currentUser = this.getCurrentUser();
    if (!currentUser || !currentUser.token) return false;

    try {
      const payload: any = JSON.parse(atob(currentUser.token));
      if (Date.now() > payload.exp) {
        this.logout();
        return false;
      }
      return true;
    } catch {
      this.logout();
      return false;
    }
  }
}
