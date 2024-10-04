import { Component } from '@angular/core';
import { AuthService } from '../../service/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  registrationFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.registrationFailed = true;
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/todo']); // Перенаправляем на логин после успешной регистрации
      } else {
        this.registrationFailed = true;
        this.errorMessage = 'Email is already taken';
      }
    });
  }
}