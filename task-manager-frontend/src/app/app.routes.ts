import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { AddTask } from './pages/add-task/add-task';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'add-task', component: AddTask },
  {
    path: 'edit-task/:id',
    loadComponent: () => import('./pages/edit-task/edit-task')
      .then(m => m.EditTask)
  },
  {
    path: 'task/:id',
    loadComponent: () =>
      import('./pages/task-detail/task-detail')
        .then(m => m.TaskDetail)
  }


];
