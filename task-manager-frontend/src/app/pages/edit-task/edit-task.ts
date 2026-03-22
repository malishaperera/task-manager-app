import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './edit-task.html'
})
export class EditTask implements OnInit {

  task: any = {
    title: '',
    description: '',
    status: ''
  };

  id!: number;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.taskService.getAllTasks().subscribe(data => {
      const found = data.find(t => t.id === this.id);

      if (found) {
        this.task = { ...found };

        this.cdr.detectChanges();
      }
    });
  }

  updateTask() {
    this.taskService.updateTask(this.id, this.task).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
