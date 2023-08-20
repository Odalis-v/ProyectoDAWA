import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAnimales } from 'src/app/interfaces/ianimales';

@Component({
  selector: 'app-setting-animales-info',
  templateUrl: './setting-animales-info.component.html',
  styleUrls: ['./setting-animales-info.component.css']
})
export class SettingAnimalesInfoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IAnimales
  ) {
    console.log(data.imagen);
    
  }
}
