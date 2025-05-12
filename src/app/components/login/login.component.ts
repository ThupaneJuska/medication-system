import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (res) => {
          console.log('Login response:', res);
          this.authService.storeUserSession(res.token, res.name, res.role);
          this.snackBar.open('Login successful', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
          this.router.navigate(['/landing/patients']); // Replace with your route
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Login failed';
          this.snackBar.open('Invalid Email or Passwod', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
