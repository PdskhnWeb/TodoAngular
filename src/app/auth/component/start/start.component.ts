import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit, OnDestroy {
  currentTime: Date = new Date();  // Инициализация текущего времени
  private timeInterval: any;  // Переменная для хранения интервала

  ngOnInit(): void {
    // Запуск обновления времени каждую секунду
    this.timeInterval = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);  // Интервал 1 секунда (1000 миллисекунд)
  }

  // Метод для остановки интервала при уничтожении компонента
  ngOnDestroy(): void {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  constructor(private router: Router) {}

  navigate() {
    this.router.navigate(['/login']);  // Переход на компонент "About"
  }

}