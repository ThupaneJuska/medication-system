import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-mahlanku',
  templateUrl: './mahlanku.component.html',
  styleUrls: ['./mahlanku.component.scss']
})
export class MahlankuComponent implements OnInit{
   
  medications: any[] = [];  // Store medications
  names: any[] = [
    { name: 'Chauke ML ', router: '/chauke' },
    { name: 'Eugelter PE ', router: '/eugelter' },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getMedications();  // Fetch medications when the component loads
  }

  // Fetch all medications
  getMedications() {
    this.http.get<{ medications: any[] }>('http://localhost:3000/get-medications')
      .subscribe(response => {
        this.medications = response.medications;
        console.log('Fetched medications:', this.medications);
      }, error => {
        console.error('Error fetching medications:', error);
      });
  }

  // Edit Medication (Enable editing mode)
  editMedication(medication: any) {
    medication.isEditing = true; // Enable edit mode
  }

  // Update Medication
  updateMedication(medication: any) {
    this.http.put(`http://localhost:3000/update-medication/${medication.medication_id}`, medication)
      .subscribe(response => {
        console.log('Medication updated:', response);
        medication.isEditing = false; // Disable edit mode
        this.getMedications(); // Refresh table
      }, error => {
        console.error('Error updating medication:', error);
      });
  }

  // Delete Medication
  deleteMedication(medicationId: number) {
    this.http.delete(`http://localhost:3000/delete-medication/${medicationId}`)
      .subscribe(response => {
        console.log('Medication deleted:', response);
        this.medications = this.medications.filter(med => med.medication_id !== medicationId);
      }, error => {
        console.error('Error deleting medication:', error);
      });
  }
    
}
