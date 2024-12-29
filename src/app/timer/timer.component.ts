import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ElectronService } from 'ngx-electron';
import { SettingsComponent } from '../settings/settings.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  isWorkPeriod: boolean = true;
  workMinutes: number = 25;
  breakMinutes: number = 5;
  alertAudio: HTMLAudioElement;

  constructor(private _electronService: ElectronService, private dialog: MatDialog) { 
    this.alertAudio = new Audio('assets/alert.mp3');
  }
  
  async ngOnInit() {
    try {
      const settings = await this._electronService.ipcRenderer.invoke('get-settings');
      this.workMinutes = settings.workMinutes;
      this.breakMinutes = settings.breakMinutes;
      this.minutes = this.workMinutes;
      this.ogMinutes = this.workMinutes;
    } catch (error) {
      console.error('Error getting settings:', error);
      this.minutes = 25;
      this.breakMinutes = 5;
    }

    this._electronService.ipcRenderer.on('settings-saved', (event, settings) => {
      this.workMinutes = settings.workMinutes;
      this.breakMinutes = settings.breakMinutes;
      this.resetTimer();
      console.log('Settings updated:', settings);
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
          this.togglePeriod();
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  togglePeriod() {
    clearInterval(this.timerInterval);
    this.isRunning = false;
    this.isWorkPeriod = !this.isWorkPeriod;
    if (this.isWorkPeriod) {
      this.minutes = this.workMinutes;
      this.alertAudio.play(); 
    } else {
      this.minutes = this.breakMinutes;
      this.alertAudio.play(); 
    }
    this.seconds = 0;
    this.startTimer();
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.isRunning = false;
    this.isWorkPeriod = true;
    this.minutes = this.workMinutes;
    this.seconds = 0;
  }

  openSettings() {
    this._electronService.ipcRenderer.send('resize-window', 500, 500);
    this.dialog.open(SettingsComponent, {
      width: '500px',
      height: '500px',
    });
  }
}