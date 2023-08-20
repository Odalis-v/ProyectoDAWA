import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/services/toast.service';
import { IVoluntarios } from 'src/app/interfaces/ivoluntarios';
import { POST_SOLICITUDES } from 'src/app/interfaces/itransacciones';
import { VoluntariosService } from 'src/app/services/voluntarios-service.service';
import { IRespuestaSP } from 'src/app/interfaces/irespuesta-sp';

@Component({
  selector: 'app-registrar-voluntarios',
  templateUrl: './registrar-voluntarios.component.html',
  styleUrls: ['./registrar-voluntarios.component.css']
})

export class RegistrarVoluntariosComponent {
  form: FormGroup;

  constructor(
    private _toastServices: ToastService,
    private dialogRef: MatDialogRef<RegistrarVoluntariosComponent>,
    private _volunService: VoluntariosService,
    private fb: FormBuilder,
    private router: Router

  ){ this.form = this.fb.group({
    nombres:        ['', Validators.required],
    apellidos:      ['', Validators.required],
    cedula:         ['', Validators.required],
    edad:           ['', Validators.required],
    telefono:       ['', Validators.required],
    experiencia:    ['', Validators.required],
    motivacion:     ['', Validators.required],
  })}
    
  accion() {
    if (this.form.invalid) {
      this._toastServices.error("Campos vacíos","Error")
      return
    }

    const voluntario: IVoluntarios= {
      nombres:        this.form.value.nombres,
      apellidos:      this.form.value.apellidos,
      cedula:         this.form.value.cedula,
      edad:           this.form.value.edad,
      telefono:       this.form.value.telefono,
      experiencia:    this.form.value.experiencia,
      motivacion:     this.form.value.motivacion
    }
    voluntario.transaccion = POST_SOLICITUDES;

    this._volunService.crudVoluntarios(voluntario).subscribe({
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
  }
}
