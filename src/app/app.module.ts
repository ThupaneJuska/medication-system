import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EugelterComponent } from './components/eugelter/eugelter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { MdauComponent } from './components/mdau/mdau.component';
import { ChaukeComponent } from './components/chauke/chauke.component';
import { MahlankuComponent } from './components/mahlanku/mahlanku.component';
import { RamokgotsoaComponent } from './components/ramokgotsoa/ramokgotsoa.component';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './components/landing/landing.component';
import { ReportsComponent } from './components/reports/reports.component';
import { PrescriptionsComponent } from './components/prescriptions/prescriptions.component';
import { AddPrescriptionComponent } from './dialog/add-prescription/add-prescription.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { StaffComponent } from './components/staff/staff.component';
import { PatientsComponent } from './components/patients/patients.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { AddStaffComponent } from './dialog/add-staff/add-staff.component';
import { StayLoggedInComponent } from './dialog/stay-logged-in/stay-logged-in.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    EugelterComponent,
    MdauComponent,
    ChaukeComponent,
    MahlankuComponent,
    RamokgotsoaComponent,
    LandingComponent,
    ReportsComponent,
    PrescriptionsComponent,
    AddPrescriptionComponent,
    StaffComponent,
    PatientsComponent,
    LoginComponent,
    DashboardComponent,
    AddStaffComponent,
    StayLoggedInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
     MatDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
