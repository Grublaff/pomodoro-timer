import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  imports: [ 
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule, ]
})
export class SettingsComponent {
  workDuration: number = 25; // Default value
  breakDuration: number = 5; // Default value

  saveSettings() {
    // Save settings to local storage or communicate with a service
    localStorage.setItem('workDuration', this.workDuration.toString());
    localStorage.setItem('breakDuration', this.breakDuration.toString());
    alert('Settings saved!');
  }
}
