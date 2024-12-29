import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class TimerComponent implements OnInit, OnDestroy {
  minutes: number = 25;
  ogMinutes: number = 25;
  seconds: number = 0;
  ogTimerInterval: any;
  timerInterval: any;
  isRunning: boolean = false;

  constructor(private _electronService: ElectronService, private dialog: MatDialog) { }
  
  async ngOnInit() {
    try {
      const settings = await this._electronService.ipcRenderer.invoke('get-settings');
      this.minutes = settings.workMinutes;
      this.ogMinutes = settings.workMinutes;
      this.ogTimerInterval = settings.breakMinutes;
      this.timerInterval = settings.breakMinutes;
    } catch (error) {
      console.error('Error getting settings:', error);
      this.minutes = 25;
      this.timerInterval = 5;
    }

    this._electronService.ipcRenderer.on('settings-saved', (event, settings) => {
      this.minutes = settings.workMinutes;
      this.ogMinutes = settings.workMinutes;
      this.ogTimerInterval = settings.breakMinutes;
      this.timerInterval = settings.breakMinutes;
      this.resetTimer();
      console.log('i was caööed');
    });
  }

  ngOnDestroy() {
    this._electronService.ipcRenderer.removeAllListeners('settings-saved');
  }
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
    console.log(this.timerInterval, this.minutes, this.seconds, this.ogMinutes, this.ogTimerInterval);
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.minutes = this.ogMinutes; // Replace with default from settings
    this.seconds = this.ogTimerInterval; // Replace with default from settings
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
