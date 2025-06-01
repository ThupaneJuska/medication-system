import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eugelter',
  templateUrl: './eugelter.component.html',
  styleUrls: ['./eugelter.component.scss']
})
export class EugelterComponent implements OnInit {
  medications: any[] = [];
  selectedFile: File | null = null;
  selectedImageUrl: string | null = null;

  names: any[] = [
    { name: 'Chauke ML', router: '/chauke' },
    { name: 'Mahlangu KM', router: '/mahlanku' },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getMedications();
  }

  getMedications() {
    this.http.get<{ medications: any[] }>('https://237f-41-193-168-163.ngrok-free.app/api/medications/get-medications')
      .subscribe(response => {
        this.medications = response.medications;
        console.log('Fetched medications:', this.medications);
      }, error => {
        console.error('Error fetching medications:', error);
      });
  }

  // Handle file input change
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Add Medication with image upload
  addMedication(medication: {
    name: string;
    dosage: string;
    quantity: number;
    stock_count: number;
    threshold: number;
    received_count: number;
  }) {
    const formData = new FormData();
    formData.append('name', medication.name);
    formData.append('dosage', medication.dosage);
    formData.append('quantity', medication.quantity.toString());
    formData.append('stock_count', medication.stock_count.toString());
    formData.append('threshold', medication.threshold.toString());
    formData.append('received_count', medication.received_count.toString());

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.http.post<{ message: string; medication: any }>('https://237f-41-193-168-163.ngrok-free.app/api/medications/add-medication', formData)
      .subscribe(response => {
        console.log('Medication added:', response.medication);
        this.getMedications(); // Refresh list
      }, error => {
        console.error('Error adding medication:', error);
      });
  }

    // Open image in a modal
    viewImage(imageUrl: string) {
      this.selectedImageUrl = imageUrl;
    }
  
    // Close the image modal
    closeModal() {
      this.selectedImageUrl = null;
    }
}
