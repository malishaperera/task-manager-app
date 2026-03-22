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

  getTaskById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createTask(task: { title: string; description: string; status: string }) {
    return this.http.post<any>(this.baseUrl, task);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // updateTask(id: number, task: any) {
  //   return this.http.put(`${this.baseUrl}/${id}`, task);
  // }
  updateTask(id: number, task: { title: string; description: string; status: string }) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, task);
  }
}
