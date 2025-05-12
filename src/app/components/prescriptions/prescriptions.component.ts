import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddPrescriptionComponent } from 'src/app/dialog/add-prescription/add-prescription.component';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit {

   prescriptions: any[] = [];
  
    constructor(private http: HttpClient, public dialog: MatDialog) {}
  
    ngOnInit() {
      this.getMedications();  // Fetch medications when the component loads
    }
  
    // Fetch all medications
    getMedications() {
      this.http.get('http://localhost:3000/api/prescriptions')
        .subscribe(response => {
          console.log('Full API response:', response); // Debugging step
         
            this.prescriptions = response as any[]; // Cast the response to the expected type
            console.log('Fetched prescriptions:', this.prescriptions);
        
        }, error => {
          console.error('Error fetching prescriptions:', error);
        });
    }
  
    openAddPrescriptionDialog() {
      const dialogRef = this.dialog.open(AddPrescriptionComponent,{
        width: '40%',
        height: '75%',
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this.getMedications(); // Refresh table after adding a new prescription
      });
    }
    
}
