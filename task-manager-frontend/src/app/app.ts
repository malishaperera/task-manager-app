import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskComponent } from './task/task';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task-manager-frontend');
}
