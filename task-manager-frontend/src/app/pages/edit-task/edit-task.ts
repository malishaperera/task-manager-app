import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-task.html'
})
export class EditTask implements OnInit {

  title = signal('');
  description = signal('');
  status = signal('');
  isAdmin = signal(false);
  successMsg = signal('');
  errorMsg = signal('');
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isAdmin.set(this.authService.isAdmin());

    this.taskService.getTaskById(this.id).subscribe(data => {
      this.title.set(data.title);
      this.description.set(data.description);
      this.status.set(data.status);
    });
  }

  setStatus(value: string) {
    this.status.set(value);
  }

  updateTask() {
    this.successMsg.set('');
    this.errorMsg.set('');

    console.log('isAdmin:', this.isAdmin());
    console.log('status:', this.status());
    console.log('id:', this.id);

    if (this.isAdmin()) {
      this.taskService.updateTask(this.id, {
        title: this.title(),
        description: this.description(),
        status: this.status()
      }).subscribe({
        next: () => {
          this.successMsg.set('Task updated successfully!');
          setTimeout(() => this.router.navigate(['/dashboard']), 1000);
        },
        error: (err) => {
          console.error('ADMIN update error:', err);
          this.errorMsg.set('Failed to update task. Please try again.');
        }
      });
    } else {
      console.log('USER - calling updateStatus');
      this.taskService.updateStatus(this.id, this.status()).subscribe({
        next: (res) => {
          console.log('updateStatus success:', res);
          this.successMsg.set('Status updated successfully!');
          setTimeout(() => this.router.navigate(['/dashboard']), 1000);
        },
        error: (err) => {
          console.error('USER update error:', err);
          this.errorMsg.set('Failed to update status. Please try again.');
        }
      });
    }
  }
}
