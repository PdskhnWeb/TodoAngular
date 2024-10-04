import { Component } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { TodoItem } from '../../service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  newTodo: string = '';
  todos: TodoItem[] = [];
  incompleteTodos: TodoItem[] = []; // Невыполненные задачи
  completedTodos: TodoItem[] = [];  // Выполненные задачи

  constructor(private todoService: TodoService) {
    this.updateTodos();  // Загрузка задач при инициализации компонента
  }

  // Добавление новой задачи
  addTodo(): void {
    if (this.newTodo.trim()) {
      this.todoService.addTodo(this.newTodo);
      this.newTodo = '';  // Очистка поля ввода
      this.updateTodos();  // Обновляем список задач
    }
  }

  // Удаление задачи
  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
    this.updateTodos();  // Обновляем список задач
  }

  // Переключение статуса выполнения задачи
  toggleTodo(id: number): void {
    this.todoService.toggleTodo(id);
    this.updateTodos();  // Обновляем список задач
  }

  // Обновление списка невыполненных и выполненных задач
  updateTodos(): void {
    const todos = this.todoService.getTodos();
    this.incompleteTodos = todos.filter(todo => !todo.completed); // Невыполненные
    this.completedTodos = todos.filter(todo => todo.completed);  // Выполненные
  }
}