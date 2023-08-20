import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IActividad } from 'src/app/interfaces/iactividad';
import { IRespuestaSP } from 'src/app/interfaces/irespuesta-sp';
import { DELETE_ACTIVIDAD } from 'src/app/interfaces/itransacciones';
import { ActividadServiceService } from 'src/app/services/actividad-service.service';

@Component({
  selector: 'app-setting-activities-delete',
  templateUrl: './setting-activities-delete.component.html',
  styleUrls: ['./setting-activities-delete.component.css']
})
export class SettingActivitiesDeleteComponent {

  constructor(
    private dialogRef: MatDialogRef<SettingActivitiesDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IActividad,
    private _actividadService: ActividadServiceService
  ) { }

  delete(){
    const actividad: IActividad = {
      actividadInformacion:{
        id_ActividadInformacion: this.data.actividadInformacion.id_ActividadInformacion
      },
      transaccion: DELETE_ACTIVIDAD
    }

    this._actividadService.crudActividad(actividad).subscribe({
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
