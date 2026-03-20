import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {}

  getAllTasks() {
    return this.http.get<any[]>(this.baseUrl);
  }

  addTask(task: any) {
    return this.http.post(this.baseUrl, task);
  }
}
