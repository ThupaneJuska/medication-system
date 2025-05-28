import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserIdleService } from 'src/app/services/user-idle.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy{
  name:any;
  initial:any
  role:any;
  constructor(private authService: AuthService,private router: Router, private snackBar: MatSnackBar,private userIdleService: UserIdleService) {
    const data = sessionStorage.getItem('userSession');
    const parsedData = JSON.parse(data || '{}');
    this.initial = parsedData.name.charAt(0).toUpperCase();
    this.name = parsedData.name;
    this.role = parsedData.role.toLowerCase();
  }
   ngOnInit(): void {
    // Start inactivity tracking when the dashboard loads
    this.userIdleService.startTracking();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
    this.snackBar.open('Logout successful', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success']
    });
  }

   ngOnDestroy(): void {
    // Stop tracking when the dashboard is exited (e.g., route change)
    this.userIdleService.stopTracking();
  }
}
