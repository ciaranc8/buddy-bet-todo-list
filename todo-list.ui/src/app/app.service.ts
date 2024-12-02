import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = 'http://localhost:5274/api/todo';

  constructor(private http: HttpClient) {}

  getTodoItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  addTodoItem(name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { name });
  }

  deleteTodoItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTodoItemIsComplete(id: number, isComplete: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/isComplete`, isComplete);
  }
}
