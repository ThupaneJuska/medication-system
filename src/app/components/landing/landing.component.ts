import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  name:any;
  initial:any
  role:any;
  constructor(private authService: AuthService,private router: Router, private snackBar: MatSnackBar) {
    const data = sessionStorage.getItem('userSession');
    const parsedData = JSON.parse(data || '{}');
    this.initial = parsedData.name.charAt(0).toUpperCase();
    this.name = parsedData.name;
    this.role = parsedData.role.toLowerCase();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
    this.snackBar.open('Logout successful', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }
}
