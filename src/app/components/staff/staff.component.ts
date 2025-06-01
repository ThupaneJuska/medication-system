import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddStaffComponent } from 'src/app/dialog/add-staff/add-staff.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {


  staff: any[] = [];
  staffForm!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit() {
    this.getStaff();
    this.staffForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      contact_number: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  getStaff() {
    this.http.get<any[]>('https://237f-41-193-168-163.ngrok-free.app/api/staff/all-details')
      .subscribe(response => {
        this.staff = response;
      }, error => {
        console.error('Error fetching staff:', error);
      });
  }

  openAddStaffDialog() {
    this.dialog.open(AddStaffComponent, {
      width: '40%',
      height: '80%',
    })}

    

 

  deleteStaff(staffId: number) {
    if (confirm(`Are you sure you want to delete this staff member?`)) {
      this.http.delete(`https://237f-41-193-168-163.ngrok-free.app/api/staff/${staffId}`).subscribe(() => {
        this.staff = this.staff.filter(s => s.staff_id !== staffId);
        console.log('Staff member deleted');
      }, error => {
        console.error('Error deleting staff member:', error);
      });
    }
  }
}
