import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartData, ChartType } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  @ViewChild('pieChart') pieChart?: BaseChartDirective;
  @ViewChild('lineChart') lineChart?: BaseChartDirective;

  medications: any[] = [];
  prescriptions = new MatTableDataSource<any>();
  staff: any[] = [];
  meds = 0;
  presc = 0;
  staffCount = 0;

  displayedColumns: string[] = ['staff_id', 'patient_id', 'dosage_instructions', 'prescription_date', 'medication_id'];

  pieChartData: ChartData<'pie', number[], string> = {
    labels: ['Medications', 'Prescriptions', 'Staff'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: ['#f8c15d', '#b9d74f', '#62bce8']
    }]
  };
  pieChartType: ChartType = 'pie';

  lineChartData: ChartData<'line'> = {
    labels: ['Medications', 'Prescriptions', 'Staff'],
    datasets: [{
      label: 'The Reports',
      data: [0, 0, 0],
      borderColor: '#62bce8',
      backgroundColor: 'rgba(98, 188, 232, 0.3)',
      fill: true,
      tension: 0.4
    }]
  };
  lineChartType: ChartType = 'line';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getMedications();
    this.getPrescriptions();
    this.getStaff();
  }

  getMedications() {
    this.http.get<{ medications: any[] }>('https://237f-41-193-168-163.ngrok-free.app/api/medications/get-medications')
      .subscribe(response => {
        this.medications = response.medications;
        this.meds = response.medications.length;
        this.updateChartData();
      });
  }

  getPrescriptions() {
    this.http.get<any[]>('https://237f-41-193-168-163.ngrok-free.app/api/prescriptions')
      .subscribe(response => {
        this.prescriptions.data = response;
        this.presc = response.length;
        this.updateChartData();
      });
  }

  getStaff() {
    this.http.get<any[]>('https://237f-41-193-168-163.ngrok-free.app/api/staff/all-details')
      .subscribe(response => {
        this.staff = response;
        this.staffCount = response.length;
        this.updateChartData();
      });
  }

  applyDateFilter(event: any) {
    const selectedDate = new Date(event.value);
    const formattedDate = selectedDate.toISOString().split('T')[0];

    this.prescriptions.filterPredicate = (data: any, filter: string) => {
      return data.prescription_date.startsWith(filter);
    };
    this.prescriptions.filter = formattedDate;
  }

  updateChartData() {
    this.pieChartData.datasets[0].data = [this.meds, this.presc, this.staffCount];
    this.lineChartData.datasets[0].data = [this.meds, this.presc, this.staffCount];

    this.pieChart?.update();
    this.lineChart?.update();
  }

  exportPrescriptionsToExcel(): void {
    const dataToExport = this.prescriptions.data.map(prescription => ({
      StaffID: prescription.staff_id,
      PatientID: prescription.patient_id,
      DosageInstructions: prescription.dosage_instructions,
      PrescriptionDate: prescription.prescription_date,
      MedicationID: prescription.medication_id
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = { Sheets: { 'Prescriptions': worksheet }, SheetNames: ['Prescriptions'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, 'Prescriptions_Report.xlsx');
  }
}
