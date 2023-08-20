import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IVoluntarios } from 'src/app/interfaces/ivoluntarios';
import { VoluntariosService } from 'src/app/services/voluntarios-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { IRespuestaSP } from 'src/app/interfaces/irespuesta-sp';
import { POST_VOLUNTARIO, UPDATE_VOLUNTARIO } from 'src/app/interfaces/itransacciones';

@Component({
  selector: 'app-setting-voluntarios-addedit',
  templateUrl: './setting-voluntarios-addedit.component.html',
  styleUrls: ['./setting-voluntarios-addedit.component.css']
})
export class SettingVoluntariosAddeditComponent implements OnInit {
  form: FormGroup;
  fileName!: any;
  title: string = "Agregar Voluntario";
  iconName: string = "add";

  constructor(
    private dialogRef: MatDialogRef<SettingVoluntariosAddeditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IVoluntarios,
    private _toastServices: ToastService,
    private fb: FormBuilder,
    private _volunService: VoluntariosService,
  ) {
    this.form = this.fb.group({
      nombres:        ['', Validators.required],
      imagen:         ['', Validators.required],
      apellidos:      ['', Validators.required],
      cedula:         ['', Validators.required],
      edad:           ['', Validators.required],
      telefono:       ['', Validators.required],
      experiencia:    ['', Validators.required],
      motivacion:     ['', Validators.required]
    })
  }

  onFileSelected(event: Event) {
    this.fileName = (event.target as HTMLInputElement).files?.[0]
  }

  ngOnInit(): void {
    
    if (this.data) {
      this.title = "Editar Voluntario";
      this.iconName = "edit";
      this.fileName = this.data.imagen;
      this.form.patchValue({
            nombres:      this.data.nombres,
            apellidos:    this.data.apellidos,
            cedula:       this.data.cedula,
            edad:         this.data.edad,
            telefono:     this.data.telefono,
            experiencia:  this.data.experiencia,
            motivacion:   this.data.motivacion
      })
    }
  }

  accion() {
    if (this.form.invalid) {
        this._toastServices.error("Campos vacíos","Error")
      return
    }

    const volunta: IVoluntarios= {
      nombres:        this.form.value.nombres,
      apellidos:      this.form.value.apellidos,
      cedula:         this.form.value.cedula,
      edad:           this.form.value.edad,
      telefono:       this.form.value.telefono,
      experiencia:    this.form.value.experiencia,
      motivacion:     this.form.value.motivacion,
      imagen:         this.fileName.name
    }

    if(this.data){
      volunta.id_Voluntarios = this.data.id_Voluntarios
      volunta.transaccion = UPDATE_VOLUNTARIO;
      this._volunService.crudVoluntarios(volunta).subscribe({
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
      volunta.transaccion = POST_VOLUNTARIO;
      this._volunService.crudVoluntarios(volunta).subscribe({
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

