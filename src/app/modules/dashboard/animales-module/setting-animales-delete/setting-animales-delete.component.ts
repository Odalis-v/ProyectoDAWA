import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAnimales } from 'src/app/interfaces/ianimales';
import { IRespuestaSP } from 'src/app/interfaces/irespuesta-sp';
import { DELETE_ANIMAL } from 'src/app/interfaces/itransacciones';
import { AnimalesService } from 'src/app/services/animales-service.service';

@Component({
  selector: 'app-setting-animales-delete',
  templateUrl: './setting-animales-delete.component.html',
  styleUrls: ['./setting-animales-delete.component.css'],
})
export class SettingAnimalesDeleteComponent {
  constructor(
    private dialogRef: MatDialogRef<SettingAnimalesDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAnimales,
    private _animalesService: AnimalesService
  ) {}

  delete() {
    const animales: IAnimales = {
      id_animales: this.data.id_animales,
      transaccion: DELETE_ANIMAL,
    };

    this._animalesService.crudAnimal(animales).subscribe({
      next: (respuesta: IRespuestaSP) => {
        const datosCierre = {
          resultado: 'eliminado',
          respuesta: respuesta.respuesta,
          leyenda: respuesta.leyenda,
        };
        this.dialogRef.close(datosCierre);
      },
      error: () => {
        this.dialogRef.close('error');
      },
    });
  }
}
