import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent {
  patients: any[] = [];

  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPatients();  // Fetch patients when the component loads
  }

  // Enable edit mode
  editPatient(patient: any) {
    patient.isEditing = true;
  }

  // Fetch all patients
  getPatients() {
    this.http.get<any[]>('https://crud-api-wj2g.onrender.com/api/patients')
      .subscribe(response => {
        this.patients = response;
        console.log('Fetched patients:', this.patients);
      }, error => {
        console.error('Error fetching patients:', error);
      });
  }

  // Update patient
  updatePatient(patient: any) {
    this.http.put(
      `https://crud-api-wj2g.onrender.com/api/patients/${patient.patient_id}`,
      patient
    )
    .subscribe(response => {
      console.log('Patient updated:', response);
      patient.isEditing = false;
      this.getPatients(); // Refresh table
    }, error => {
      console.error('Error updating patient:', error);
    });
  }
}
