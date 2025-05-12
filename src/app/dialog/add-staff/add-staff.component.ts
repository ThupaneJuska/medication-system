import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss']
})
export class AddStaffComponent {


  staff: any[] = [];
  staffForm!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, 
    private closeDialog: MatDialogRef<AddStaffComponent>, private snackbar:MatSnackBar, private dialogRef: MatDialogRef<AddStaffComponent>) {}

  ngOnInit() {
    this.getStaff();
    this.staffForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      contact_number: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }


  getStaff() {
    this.http.get<any[]>('http://localhost:3000/api/staff/all-details')
      .subscribe(response => {
        this.staff = response;
      }, error => {
        console.error('Error fetching staff:', error);
      });
  }

  addStaff() {
    if (this.staffForm.valid) {
      const newStaff = this.staffForm.value;
      this.http.post('http://localhost:3000/api/staff/add-staff', newStaff).subscribe((created: any) => {
        this.staff.push(created);
        this.staffForm.reset();
        this.getStaff();
        this.closeDialog.close() // Refresh the staff list
        console.log('Staff member added');
      }, error => {
        this.snackbar.open('User already exist', 'Close', {
          duration: 30000,
          panelClass: ['snackbar-error']
        });
        console.error('Error adding staff:', error);
      });
    }
  }

  onClose() {
    this.closeDialog.close();
    this.getStaff();
    }

}
