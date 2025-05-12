import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient for HTTP requests

@Component({
  selector: 'app-chauke',
  templateUrl: './chauke.component.html',
  styleUrls: ['./chauke.component.scss']
})
export class ChaukeComponent {

  medications: any[] = [];  // Store medications  // Array to store items
    names: any[] = [
      {name: 'Chauke ML ', router: '/chauke'}, 
      {name: 'Mahlangu KM ', router: '/mahlanku'},
    ];  // Array for navigation links
  
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

      // Delete Medication
  deleteMedication(medicationId: number) {
    this.http.delete<{ message: string }>(`http://localhost:3000/delete-medication/${medicationId}`)
      .subscribe(response => {
        console.log('Medication deleted:', response.message);
        this.getMedications(); // Refresh the table after deletion
      }, error => {
        console.error('Error deleting medication:', error);
      });
  }
}
