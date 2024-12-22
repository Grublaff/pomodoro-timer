import { Component } from '@angular/core';
import { TimerComponent } from './timer/timer.component';
import { SettingsComponent } from "./settings/settings.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [TimerComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pomodoro-timer';
}
