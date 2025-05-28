// user-idle.service.ts (updated version)
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StayLoggedInComponent } from '../dialog/stay-logged-in/stay-logged-in.component';

@Injectable({
  providedIn: 'root'
})
export class UserIdleService {
  private idleTimeout: any;
  private warningTimeout: any;
  private tracking = false;

  private readonly IDLE_TIME = 50 * 1000; // warn after 50s
  private readonly WARNING_TIME = 10 * 1000; // auto logout after 10s

  constructor(private router: Router, private ngZone: NgZone, private dialog: MatDialog) {}

  public startTracking() {
    if (this.tracking) return; // prevent duplicate listeners
    this.tracking = true;
    this.initListeners();
    this.resetTimers();
  }

  public stopTracking() {
    this.tracking = false;
    clearTimeout(this.idleTimeout);
    clearTimeout(this.warningTimeout);
    this.removeListeners();
  }

  private initListeners() {
    ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach(event =>
      document.addEventListener(event, this.resetTimersBound, true)
    );
  }

  private removeListeners() {
    ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach(event =>
      document.removeEventListener(event, this.resetTimersBound, true)
    );
  }

  private resetTimersBound = () => this.resetTimers();

  private resetTimers() {
    if (!this.tracking) return;

    clearTimeout(this.idleTimeout);
    clearTimeout(this.warningTimeout);

    this.idleTimeout = setTimeout(() => {
      this.showWarningDialog();
    }, this.IDLE_TIME);
  }

  private showWarningDialog() {
    const dialogRef = this.dialog.open(StayLoggedInComponent, {
      width: '400px',
      disableClose: true
    });

    this.warningTimeout = setTimeout(() => {
      dialogRef.close(false);
    }, this.WARNING_TIME);

    dialogRef.afterClosed().subscribe(stayLoggedIn => {
      clearTimeout(this.warningTimeout);
      if (stayLoggedIn) {
        this.resetTimers();
      } else {
        this.logoutUser();
      }
    });
  }

  private logoutUser() {
    localStorage.clear();
    sessionStorage.clear();
    this.ngZone.run(() => this.router.navigate(['/login']));
    alert('You have been logged out due to inactivity.');
  }
}
