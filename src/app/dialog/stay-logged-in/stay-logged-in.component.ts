// stay-logged-in.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-stay-logged-in',
  template: `
    <h2 mat-dialog-title>Session Timeout</h2>
    <mat-dialog-content>
      <p>You’ve been inactive. Do you want to stay logged in?</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="close(false)">Logout</button>
      <button mat-button color="primary" (click)="close(true)">Stay Logged In</button>
    </mat-dialog-actions>
  `
})
export class StayLoggedInComponent {
  constructor(private dialogRef: MatDialogRef<StayLoggedInComponent>) {}

  close(result: boolean) {
    this.dialogRef.close(result);
  }
}
