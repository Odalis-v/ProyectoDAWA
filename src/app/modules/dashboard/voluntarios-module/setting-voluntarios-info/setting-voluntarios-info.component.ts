import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IVoluntarios } from 'src/app/interfaces/ivoluntarios';

@Component({
  selector: 'app-setting-voluntarios-info',
  templateUrl: './setting-voluntarios-info.component.html',
  styleUrls: ['./setting-voluntarios-info.component.css']
})
export class SettingVoluntariosInfoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IVoluntarios
  ) {
    
  }
}
