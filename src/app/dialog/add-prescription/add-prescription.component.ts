import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.scss']
})
export class AddPrescriptionComponent implements OnInit {
  prescriptionForm: FormGroup;
  isSubmitting = false;
  patients: any[] = [];
  medications: any[] = [];
  staffList: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private dialogRef: MatDialogRef<AddPrescriptionComponent>
  ) {
    this.prescriptionForm = this.fb.group({
      prescription_date: ['', Validators.required],
      dosage_instructions: ['', Validators.required],
      patient_id: ['', Validators.required],
      medication_id: ['', Validators.required],
      staff_id: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchPatients();
    this.fetchMedications();
    this.fetchStaff();
  }

  addPrescription() {
    if (this.prescriptionForm.invalid) return;
    console.log('Form submitted:', this.prescriptionForm.value);
    this.http.post('https://crud-api-wj2g.onrender.com/api/prescriptions', this.prescriptionForm.value)
      .subscribe(response => {
        console.log('Prescription added:', response);
        this.dialogRef.close();
      }, error => {
        console.error('Error adding prescription:', error);
        this.isSubmitting = false;
      });
  }

  onClose() {
    this.dialogRef.close();
  }

  fetchPatients() {
    this.http.get<any[]>('https://crud-api-wj2g.onrender.com/api/patients').subscribe(data => {
      this.patients = data; // Assign the patients data directly
    }, error => {
      console.error('Error fetching patients:', error);
    });
  }

  fetchMedications() {
    this.http.get<any>('https://crud-api-wj2g.onrender.com/api/medications/get-medications').subscribe(response => {
      this.medications = response.medications; // Access the 'medications' array
    }, error => {
      console.error('Error fetching medications:', error);
    });
  }

  fetchStaff() {
    this.http.get<any[]>('https://crud-api-wj2g.onrender.com/api/staff').subscribe(data => {
      this.staffList = data; // Assign the staff data directly
    }, error => {
      console.error('Error fetching staff:', error);
    });
  }
}
