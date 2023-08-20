import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IVoluntarios } from 'src/app/interfaces/ivoluntarios';
import { IRespuestaSP } from 'src/app/interfaces/irespuesta-sp';
import { DELETE_VOLUNTARIO } from 'src/app/interfaces/itransacciones';
import { VoluntariosService } from 'src/app/services/voluntarios-service.service';
@Component({
  selector: 'app-setting-voluntarios-delete',
  templateUrl: './setting-voluntarios-delete.component.html',
  styleUrls: ['./setting-voluntarios-delete.component.css']
})
export class SettingVoluntariosDeleteComponent {
  constructor(
    private dialogRef: MatDialogRef<SettingVoluntariosDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IVoluntarios,
    private _voluntariosService: VoluntariosService
  ) { }

  delete(){
    const volunta: IVoluntarios = {
        id_Voluntarios: this.data.id_Voluntarios,
        transaccion: DELETE_VOLUNTARIO
    }
    this._voluntariosService.crudVoluntarios(volunta).subscribe({
      next: (respuesta: IRespuestaSP) => {
        const datosCierre = {
          resultado: "eliminado",
          respuesta: respuesta.respuesta,
          leyenda: respuesta.leyenda          
        };
        this.dialogRef.close(datosCierre);
      },
      error: () => {
        this.dialogRef.close("error");
      }
    });
  }
}
