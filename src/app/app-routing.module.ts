import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EugelterComponent } from './components/eugelter/eugelter.component';
import { MdauComponent } from './components/mdau/mdau.component';
import { ChaukeComponent } from './components/chauke/chauke.component';
import { MahlankuComponent } from './components/mahlanku/mahlanku.component';
import { RamokgotsoaComponent } from './components/ramokgotsoa/ramokgotsoa.component';

const routes: Routes = [
  { path: '', redirectTo: '/eugelter', pathMatch: 'full' },
  { path: 'eugelter', component: EugelterComponent },
  { path: 'mdau', component: MdauComponent },
  { path: 'ramokgotsoa', component: RamokgotsoaComponent },
  { path: 'chauke', component: ChaukeComponent },
  { path: 'mahlanku', component: MahlankuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
