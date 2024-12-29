import { Component, OnInit } from '@angular/core';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ElectronService } from 'ngx-electron';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  imports: [ 
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule, ],
  styleUrls: ['./settings.component.css'],
  providers: [ElectronService]
})
export class SettingsComponent implements OnInit {
  workMinutes: number | undefined;
  breakMinutes: number | undefined;

  constructor(private _electronService: ElectronService, private dialogRef: MatDialogRef<SettingsComponent>) {}

  async ngOnInit() {
    try {
      const settings = await this._electronService.ipcRenderer.invoke('get-settings');
      this.workMinutes = settings.workMinutes;
      this.breakMinutes = settings.breakMinutes;
    } catch (error) {
      console.error('Error getting settings:', error);
      this.workMinutes = 25;
      this.breakMinutes = 5;
    }
  }

  saveSettings() {
    const settings = {
      workMinutes: this.workMinutes,
      breakMinutes: this.breakMinutes,
    };
    this._electronService.ipcRenderer.send('save-settings', settings);

    this.dialogRef.close();
  }
}