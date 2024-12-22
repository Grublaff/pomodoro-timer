import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimerComponent } from './timer/timer.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  { path: '', component: TimerComponent },
  { path: 'settings', component: SettingsComponent }, // Route for settings
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
