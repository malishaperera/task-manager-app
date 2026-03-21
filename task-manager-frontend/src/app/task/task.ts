import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TaskService } from '../services/task';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task implements OnInit {

  tasks: any[] = [];
  taskForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      title:       ['', Validators.required],
      description: ['', Validators.required],
      status:      ['TODO', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.taskService.createTask(this.taskForm.value).subscribe({
      next: () => {
        this.successMessage = 'Task added successfully!';
        this.taskForm.reset({ status: 'TODO' });
        this.isSubmitting = false;
        this.loadTasks();
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to add task. Please try again.';
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (err) => console.error(err)
    });
  }

  updateStatus(task: any) {
    const updatedTask = {
      title: task.title,
      description: task.description,
      status: task.status === 'IN_PROGRESS' ? 'COMPLETED' : 'IN_PROGRESS'
    };

    console.log("SEND DATA =>", updatedTask);

    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (err) => console.error(err)
    });
  }
}
