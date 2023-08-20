import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPersonalizado } from 'src/app/interfaces/iactividad';

@Component({
  selector: 'app-setting-personalizado-info',
  templateUrl: './setting-personalizado-info.component.html',
  styleUrls: ['./setting-personalizado-info.component.css']
})
export class SettingPersonalizadoInfoComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IPersonalizado
  ) { }
}
