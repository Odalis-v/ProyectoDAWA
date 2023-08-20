import { ActividadPersonalizadaServicesService } from 'src/app/services/actividad-personalizada-services.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IPersonalizado } from 'src/app/interfaces/iactividad';
import { ToastService } from 'src/app/services/toast.service';
import { Component, Inject, OnInit } from '@angular/core';
import { IHorario } from 'src/app/interfaces/ihorario';
import { UPDATE_PERSONALIZADO } from 'src/app/interfaces/itransacciones';
import { IRespuestaSP } from 'src/app/interfaces/irespuesta-sp';
import { ActividadServiceService } from 'src/app/services/actividad-service.service';

@Component({
  selector: 'app-setting-personalizado-edit',
  templateUrl: './setting-personalizado-edit.component.html',
  styleUrls: ['./setting-personalizado-edit.component.css']
})
export class SettingPersonalizadoEditComponent implements OnInit {
  form: FormGroup;
  listHorarios!: IHorario[];
 
  constructor(
    private fb: FormBuilder,
    private _toastServices: ToastService,
    private _actividadesServices: ActividadPersonalizadaServicesService,
    private _horarioService: ActividadServiceService,
    private dialogRef: MatDialogRef<SettingPersonalizadoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPersonalizado,
  ) {
    this.form = this.fb.group({
      nombreUsuario:        ['', Validators.required],
      telefono:             ['', Validators.required],
      cantidadPersonas:     ['', Validators.required],
      cantidadGuias:        ['', Validators.required],
      hora:                 ['', Validators.required],
      fecha:                ['', Validators.required],
      descripcion:          ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.obtenerHorarios()
    if(this.data){
      this.form.patchValue({
        nombreUsuario:              this.data.nombreUsuario,
        telefono:                   this.data.telefono,
        cantidadPersonas:           this.data.actividadInformacion.cantidadPersonas,
        cantidadGuias:              this.data.actividadInformacion.cantidadGuias,
        hora:                       this.data.actividadInformacion.horario?.id_Horario,
        fecha:                      this.data.fecha,
        descripcion:                this.data.actividadInformacion.descripcion
      })
    }
  }  

  obtenerHorarios(){
    this._horarioService.getHorarios().subscribe({
      next: (data) =>{
        this.listHorarios = data;
      },
      error: (e) => {
        this._toastServices.error("Problemas con el servidor","Error")
      }
    })
  }  

  enviar(){
    if(this.form.invalid){
      this._toastServices.error("Campos vacíos","Error");
      return
    }

    const fechaselect: Date = this.form.value.fecha;
    if (fechaselect < new Date()) {
      this._toastServices.error("Seleccione una fecha válida", "Error");
      return;
    }

    const precio = this.form.value.cantidadPersonas * 15;
    
    const actividad: IPersonalizado = {
      actividadInformacion: {
        id_ActividadInformacion:  this.data.actividadInformacion.id_ActividadInformacion,
        horario: {
          id_Horario:             this.form.value.hora,
        },
        cantidadPersonas:         this.form.value.cantidadPersonas,
        cantidadGuias:            this.form.value.cantidadGuias,
        descripcion:              this.form.value.descripcion,
        precio:                   precio
      },
      nombreUsuario:              this.form.value.nombreUsuario,
      telefono:                   this.form.value.telefono,
      fecha:                      this.form.value.fecha,
      transaccion:                UPDATE_PERSONALIZADO
    }
    console.log(actividad);
    
    this._actividadesServices.crudPersonalizado(actividad).subscribe({
      next: (respuesta: IRespuestaSP) => {
        const datosCierre = {
          resultado: "actualizado",
          respuesta: respuesta.respuesta,
          leyenda: respuesta.leyenda   
        };
        this.dialogRef.close(datosCierre);
      },
      error: () => {
        this.dialogRef.close("error");
      }
    })
    return
  }
  
}
