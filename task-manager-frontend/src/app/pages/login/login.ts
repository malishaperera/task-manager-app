import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = signal('');
  password = signal('');
  error = signal('');

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post('http://localhost:8080/api/auth/login',
      {
        username: this.username(),
        password: this.password()
      },
      { responseType: 'text' } // String response
    ).subscribe({
      next: (token: string) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error.set('Invalid username or password!');
      }
    });
  }
}
