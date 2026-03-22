import { Component } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task'

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {
  title: string = '';
  description: string = '';
  status: string = 'PENDING';

  constructor(private taskService: TaskService,private router: Router) {}

  saveTask() {
    if (!this.title) {
      alert("Task title is required!");
      return;
    }

    const newTask = {
      title: this.title,
      status: this.status,
      description: this.description
    };

    this.taskService.createTask(newTask).subscribe({
      next: (res) => {
        console.log("Saved:", res);

        alert("Task Saved Successfully!");
        this.router.navigate(['/']);

        // clear form
        this.title = '';
        this.status = 'PENDING';
        this.description = '';
      },
      error: (err) => {
        console.error(err);
        alert("Error saving task!");
      }
    });
  }
}
