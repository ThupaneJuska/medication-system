import { HttpClient } from '@angular/common/http';
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

    // Edit Medication (Enable editing mode)
  editPatient(patient: any) {
    patient.isEditing = true; // Enable edit mode
  }

     // Fetch all patients
  getPatients() {
    this.http.get<any[] >('http://localhost:3000/api/patients')
      .subscribe(response => {
        this.patients = response;
        console.log('Fetched patients:', this.patients);
      }, error => {
        console.error('Error fetching patients:', error);
      });
  }

      // Update Medication
  updatePatient(patient: any) {
    this.http.put(`http://localhost:3000/api/patients/${patient.patient_id}`, patient)
      .subscribe(response => {
        console.log('patient updated:', response);
        patient.isEditing = false; // Disable edit mode
        this.getPatients(); // Refresh table
      }, error => {
        console.error('Error updating patient:', error);
      });
  }
}
