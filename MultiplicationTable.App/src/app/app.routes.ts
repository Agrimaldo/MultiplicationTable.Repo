import { Routes } from '@angular/router';
import { MultiplicationComponent } from './component/multiplication/multiplication.component';

export const routes: Routes = [
  { path: '', component: MultiplicationComponent },
  { path: '', pathMatch: 'full', redirectTo: '' }
];
