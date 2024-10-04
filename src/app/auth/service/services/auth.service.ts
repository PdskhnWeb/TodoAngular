import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { username: 'user1', email: 'user1@example.com', password: 'password123' }
  ];
  private isAuthenticated = false;

  constructor() {}

  // Метод регистрации
  register(username: string, email: string, password: string): Observable<boolean> {
    const userExists = this.users.some(user => user.email === email);
    if (userExists) {
      return of(false); // Email уже занят
    }
    this.users.push({ username, email, password });
    return of(true);
  }

  // Метод для логина
  login(email: string, password: string): Observable<boolean> {
    const user = this.users.find(user => user.email === email && user.password === password);
    if (user) {
      this.isAuthenticated = true;
      return of(true);
    }
    return of(false);
  }

  // Проверка авторизован ли пользователь
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Метод для выхода
  logout(): void {
    this.isAuthenticated = false;
  }
}
