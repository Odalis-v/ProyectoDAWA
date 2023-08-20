import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRespuestaSP } from 'src/app/interfaces/irespuesta-sp';
import { UPDATE_SOLICITUDES } from 'src/app/interfaces/itransacciones';
import { IVoluntarios } from 'src/app/interfaces/ivoluntarios';
import { ToastService } from 'src/app/services/toast.service';
import { VoluntariosService } from 'src/app/services/voluntarios-service.service';

@Component({
  selector: 'app-setting-solicitud-v-edit',
  templateUrl: './setting-solicitud-v-edit.component.html',
  styleUrls: ['./setting-solicitud-v-edit.component.css']
})
export class SettingSolicitudVEditComponent implements OnInit {
  form: FormGroup;  

  constructor(
    private fb: FormBuilder,
    private _toastServices: ToastService,
    private _solicitudServices: VoluntariosService,
    private dialogRef: MatDialogRef<SettingSolicitudVEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IVoluntarios,
  ) {
    this.form = this.fb.group({
      nombres:        ['', Validators.required],
      apellidos:      ['', Validators.required],
      cedula:         ['', Validators.required],
      edad:           ['', Validators.required],
      telefono:       ['', Validators.required],
      experiencia:    ['', Validators.required],
      motivacion:     ['', Validators.required],
    })
  }

  ngOnInit(): void {
    if(this.data){
      this.form.patchValue({
        nombres:       this.data.nombres,
        apellidos:     this.data.apellidos,
        cedula:        this.data.cedula,
        edad:          this.data.edad,
        telefono:      this.data.telefono,
        experiencia:   this.data.experiencia,
        motivacion:    this.data.motivacion
      })
    }
  }  

  enviar(){
    if(this.form.invalid){
      this._toastServices.error("Campos vacíos","Error");
      return
    }
    
    const solicitud: IVoluntarios = {
      id_Voluntarios:   this.data.id_Voluntarios,
      nombres:          this.form.value.nombres,
      apellidos:        this.form.value.apellidos,
      cedula:           this.form.value.cedula,
      edad:             this.form.value.edad,
      telefono:         this.form.value.telefono,
      experiencia:      this.form.value.experiencia,
      motivacion:       this.form.value.motivacion,
      estado:           true,
      transaccion:      UPDATE_SOLICITUDES
    }
        
    this._solicitudServices.crudVoluntarios(solicitud).subscribe({
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
