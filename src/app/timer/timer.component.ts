import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ElectronService } from 'ngx-electron';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  imports: [ CommonModule, RouterModule ],
  providers: [ ElectronService ]
})
export class TimerComponent {
  minutes: number = 25;
  seconds: number = 0;
  timerInterval: any;
  isRunning: boolean = false;

  constructor(private _electronService: ElectronService, private dialog: MatDialog) { }

    startTimer() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.timerInterval = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          this.resetTimer();
          alert('Time is up!');
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.minutes = 25; // Replace with default from settings
    this.seconds = 0;
    this.isRunning = false;
  }

  openSettings() {
    this._electronService.ipcRenderer.send('resize-window', 500, 500);
    this.dialog.open(SettingsComponent, {
      width: '500px',
      height: '500px',
    });
   }
}
