import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EugelterComponent } from './components/eugelter/eugelter.component';
import { MdauComponent } from './components/mdau/mdau.component';
import { ChaukeComponent } from './components/chauke/chauke.component';
import { MahlankuComponent } from './components/mahlanku/mahlanku.component';
import { RamokgotsoaComponent } from './components/ramokgotsoa/ramokgotsoa.component';
import { StaffComponent } from './components/staff/staff.component';
import { ReportsComponent } from './components/reports/reports.component';
import { PrescriptionsComponent } from './components/prescriptions/prescriptions.component';
import { PatientsComponent } from './components/patients/patients.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuard],children: [
    { path: 'medications', component: EugelterComponent },
    { path: 'mdau', component: MdauComponent },
    { path: 'ramokgotsoa', component: RamokgotsoaComponent },
    { path: 'chauke', component: ChaukeComponent },
    { path: 'staff', component: StaffComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'prescriptions', component: PrescriptionsComponent },
    { path: 'patients', component: PatientsComponent },
    { path: 'dashboard', component: DashboardComponent },
  ]},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
