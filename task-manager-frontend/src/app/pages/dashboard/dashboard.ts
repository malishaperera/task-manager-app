import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  tasks = signal<any[]>([]);
  isLoading = signal(true);

  inProgressCount = computed(() =>
    this.tasks().filter(t => t.status === 'IN_PROGRESS').length
  );

  completedCount = computed(() =>
    this.tasks().filter(t => t.status === 'COMPLETED').length
  );

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading.set(true);

    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        console.log("DATA:", data);
        this.tasks.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }
}
