import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IActividad } from 'src/app/interfaces/iactividad';
import { IHorario } from 'src/app/interfaces/ihorario';
import { IRespuestaSP } from 'src/app/interfaces/irespuesta-sp';
import { POST_ACTIVIDAD, UPDATE_ACTIVIDAD } from 'src/app/interfaces/itransacciones';
import { ActividadServiceService } from 'src/app/services/actividad-service.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-setting-activities-addedit',
  templateUrl: './setting-activities-addedit.component.html',
  styleUrls: ['./setting-activities-addedit.component.css']
})
export class SettingActivitiesAddeditComponent implements OnInit {
  form: FormGroup;
  fileName!: any;
  title: string = "Agregar Actividad";
  iconName: string = "add";
  listHorarios!: IHorario[];
  
  constructor(
    private dialogRef: MatDialogRef<SettingActivitiesAddeditComponent>,
    private _actividadService: ActividadServiceService,
    @Inject(MAT_DIALOG_DATA) public data: IActividad,
    private _toastServices: ToastService,
    private fb: FormBuilder
    ) {
    this.form = this.fb.group({
      nombre:               ['', Validators.required],
      imagen:               ['', Validators.required],
      cantidadPersonas:     ['', Validators.required],
      cantidadGuias:        ['', Validators.required],
      precio:               ['', Validators.required],
      descripcion:          ['', Validators.required],
      hora:                 ['', Validators.required],
      time:                 ['', Validators.required],      
    })
  }

  onFileSelected(event: Event) {
    this.fileName = (event.target as HTMLInputElement).files?.[0]
  }  

  ngOnInit(): void {
    this.obtenerHorarios();
    if(this.data){
      this.title              = "Editar Actividad";
      this.iconName           = "edit";
      this.fileName           = this.data.imagen;
      this.form.patchValue({
        nombre:               this.data.nombre,
        cantidadPersonas:     this.data.actividadInformacion.cantidadPersonas,
        cantidadGuias:        this.data.actividadInformacion.cantidadGuias,
        precio:               this.data.actividadInformacion.precio,
        descripcion:          this.data.actividadInformacion.descripcion,
        hora:                 this.data.actividadInformacion.horario?.id_Horario,
        time:                 this.data.tiempo
      })
    }
  }

  obtenerHorarios(){
    this._actividadService.getHorarios().subscribe({
      next: (data) =>{
        this.listHorarios = data;
      },
      error: (e) => {
        this._toastServices.error("Problemas con el servidor","Error")
      }
    })
  }  

  accion(){
    if(this.form.invalid){
      this._toastServices.error("Campos vacíos","Error")
      return
    }

    const actividad: IActividad = {
      actividadInformacion: {
        horario: {
          id_Horario:       this.form.value.hora
        },
        cantidadPersonas:   this.form.value.cantidadPersonas,
        cantidadGuias:      this.form.value.cantidadGuias,
        precio:             this.form.value.precio,
        descripcion:        this.form.value.descripcion        
      },
      nombre:               this.form.value.nombre,
      tiempo:               this.form.value.time,
      imagen:               this.fileName.name
    }

    if(this.data){
      actividad.actividadInformacion.id_ActividadInformacion = this.data.actividadInformacion.id_ActividadInformacion
      actividad.transaccion = UPDATE_ACTIVIDAD;
      this._actividadService.crudActividad(actividad).subscribe({
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

    if(!this.data){
      actividad.transaccion = POST_ACTIVIDAD;
      this._actividadService.crudActividad(actividad).subscribe({
        next: (respuesta: IRespuestaSP) => {
          const datosCierre = {
            resultado: "agregado",
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
    this._toastServices.error("A ocurrido un error","Lo sentimos")
  }

}
