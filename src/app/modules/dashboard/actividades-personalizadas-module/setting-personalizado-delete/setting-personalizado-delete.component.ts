
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPersonalizado } from 'src/app/interfaces/iactividad';
import { IRespuestaSP } from 'src/app/interfaces/irespuesta-sp';
import { DELETE_PERSONALIZADO } from 'src/app/interfaces/itransacciones';
import { ActividadPersonalizadaServicesService } from 'src/app/services/actividad-personalizada-services.service';

@Component({
  selector: 'app-setting-personalizado-delete',
  templateUrl: './setting-personalizado-delete.component.html',
  styleUrls: ['./setting-personalizado-delete.component.css']
})
export class SettingPersonalizadoDeleteComponent {

  constructor(
    private dialogRef: MatDialogRef<SettingPersonalizadoDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPersonalizado,
    private _actividadService: ActividadPersonalizadaServicesService
  ) { }

  delete(){
    const actividad: IPersonalizado = {
      actividadInformacion:{
        id_ActividadInformacion: this.data.actividadInformacion.id_ActividadInformacion
      },
      transaccion: DELETE_PERSONALIZADO
    }
console.log(actividad);

    this._actividadService.crudPersonalizado(actividad).subscribe({
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
