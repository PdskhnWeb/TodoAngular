import { Injectable } from '@angular/core';

export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: TodoItem[] = [];
  private nextId: number = 1;

  constructor() {
    this.loadTodos();  // Загрузка задач при инициализации сервиса
  }

  // Получение всех задач
  getTodos(): TodoItem[] {
    return this.todos;
  }

  // Добавление новой задачи
  addTodo(title: string): void {
    this.todos.push({ id: this.nextId++, title, completed: false });
    this.saveTodos();  // Сохраняем задачи после добавления
  }

  // Удаление задачи
  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();  // Сохраняем задачи после удаления
  }

  // Переключение статуса задачи (выполнена/не выполнена)
  toggleTodo(id: number): void {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();  // Сохраняем задачи после изменения статуса
    }
  }

  // Сохранение задач в localStorage
  private saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  // Загрузка задач из localStorage
  private loadTodos(): void {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
      this.nextId = this.todos.length > 0 ? Math.max(...this.todos.map(t => t.id)) + 1 : 1;
    }
  }
}
