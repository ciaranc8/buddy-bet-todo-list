import { Component } from '@angular/core';
import { AppService } from './app.service';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-list.ui';
  todos: any[] = [];
  newTodo: string = '';
  constructor(private appService: AppService) {}


  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.appService.getTodoItems().subscribe((data: any) => {
      this.todos = data;
    });
  }

  addTodo(): void {
    if (this.newTodo.trim()) {
      this.appService.addTodoItem(this.newTodo).subscribe((todo: any) => {
        this.todos.push(todo);
        this.newTodo = '';
      });
    }
  }

  deleteTodo(id: number): void {
    this.appService.deleteTodoItem(id).subscribe(() => {
      this.todos = this.todos.filter(todo => todo.id !== id);
    });
  }

  updateIsComplete(id: number, isComplete: boolean): void {
    this.appService.updateTodoItemIsComplete(id, isComplete).subscribe(() => {
      const todo = this.todos.find(t => t.id === id);
      if (todo) {
        todo.isComplete = isComplete;
      }
    });
  }
  
}
