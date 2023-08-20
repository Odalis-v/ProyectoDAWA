import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IActividad } from 'src/app/interfaces/iactividad';

@Component({
  selector: 'app-setting-activities-info',
  templateUrl: './setting-activities-info.component.html',
  styleUrls: ['./setting-activities-info.component.css']
})
export class SettingActivitiesInfoComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IActividad
  ) { }
}
