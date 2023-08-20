import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IVoluntarios } from 'src/app/interfaces/ivoluntarios';

@Component({
  selector: 'app-setting-solicitud-v-info',
  templateUrl: './setting-solicitud-v-info.component.html',
  styleUrls: ['./setting-solicitud-v-info.component.css']
})
export class SettingSolicitudVInfoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IVoluntarios
  ) { }
}
