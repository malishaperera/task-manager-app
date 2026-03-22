import { Component, signal } from '@angular/core';
import { Task } from './task/task';
import { Sidebar } from './components/sidebar/sidebar';
import { Dashboard } from './pages/dashboard/dashboard';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Sidebar,Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task-manager-frontend');
}
