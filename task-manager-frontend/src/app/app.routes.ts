import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { AddTask } from './pages/add-task/add-task';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'add-task', component: AddTask }
];
