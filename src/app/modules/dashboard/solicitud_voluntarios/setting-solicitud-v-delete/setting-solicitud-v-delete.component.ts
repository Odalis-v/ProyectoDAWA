import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRespuestaSP } from 'src/app/interfaces/irespuesta-sp';
import { ACCEPT_SOLICITUDES, REJECT_SOLICITUDES } from 'src/app/interfaces/itransacciones';
import { IVoluntarios } from 'src/app/interfaces/ivoluntarios';
import { SolicitudVolunServicesService } from 'src/app/services/solicitud-volun-services.service';
import { VoluntariosService } from 'src/app/services/voluntarios-service.service';
@Component({
  selector: 'app-setting-solicitud-v-delete',
  templateUrl: './setting-solicitud-v-delete.component.html',
  styleUrls: ['./setting-solicitud-v-delete.component.css']
})

export class SettingSolicitudVDeleteComponent implements OnInit{
  title: string = "Rechazar";
  datos!: IVoluntarios;
  icono: string = "delete"
  clase: string = "btn-danger"

  constructor(
    private dialogRef: MatDialogRef<SettingSolicitudVDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _solicitudService: VoluntariosService
  ) { }

  ngOnInit() {
    if(this.data.bandera){
      this.title = "aceptar"
      this.icono = "verified"
      this.clase = "btn-success"
    }
    this.datos = this.data.actividadData
  }

  accion(){

    const volunta: IVoluntarios= {
      id_Voluntarios: this.datos.id_Voluntarios,
      transaccion:    (this.title === "aceptar") ? ACCEPT_SOLICITUDES : REJECT_SOLICITUDES
    }

    this._solicitudService.crudVoluntarios(volunta).subscribe({
      next: (respuesta: IRespuestaSP) => {
        const datosCierre = {
          resultado: "respuesta",
          respuesta: respuesta.respuesta,
          leyenda: respuesta.leyenda   
        };
        this.dialogRef.close(datosCierre);
      },
      error: () => {
        this.dialogRef.close("error");
      }
    })
  }
}
