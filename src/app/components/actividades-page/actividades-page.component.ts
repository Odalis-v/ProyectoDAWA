import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPersonalizado } from 'src/app/interfaces/iactividad';
import { IHorario } from 'src/app/interfaces/ihorario';
import { IRespuestaSP } from 'src/app/interfaces/irespuesta-sp';
import { POST_PERSONALIZADO } from 'src/app/interfaces/itransacciones';
import { ActividadPersonalizadaServicesService } from 'src/app/services/actividad-personalizada-services.service';
import { ActividadServiceService } from 'src/app/services/actividad-service.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-actividades-page',
  templateUrl: './actividades-page.component.html',
  styleUrls: ['./actividades-page.component.css']
})
export class ActividadesPageComponent implements OnInit{
  form: FormGroup;  
  loading: boolean = false;  
  listHorarios!: IHorario[];

  constructor(
    private fb: FormBuilder,
    private _toastServices: ToastService,
    private _actividadesServices: ActividadPersonalizadaServicesService,
    private _horarios: ActividadServiceService,
    private router: Router
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

  ngOnInit(){
    this.obtenerHorarios()
  }

  obtenerHorarios(){
    this.loading = true;
    this._horarios.getHorarios().subscribe({
      next: (data) =>{
        this.loading = false;
        this.listHorarios = data;        
      },
      error: (e) => {
        this.loading = false
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

    this.loading = true;

    const precio = this.form.value.cantidadPersonas * 15;

    const actividad: IPersonalizado = {
      actividadInformacion: {
        horario: {
          id_Horario:         this.form.value.hora
        },
        cantidadPersonas:     this.form.value.cantidadPersonas,
        cantidadGuias:        this.form.value.cantidadGuias,
        precio:               precio,
        descripcion:          this.form.value.descripcion
      },
      nombreUsuario:        this.form.value.nombreUsuario,
      telefono:             this.form.value.telefono,      
      fecha:                this.form.value.fecha,
      transaccion:          POST_PERSONALIZADO
    }
    
    this._actividadesServices.crudPersonalizado(actividad).subscribe({
      next: (repuesta: IRespuestaSP) => {
        this.loading = false
        
        if(repuesta.respuesta === 'ERROR'){
          this._toastServices.error(`${repuesta.leyenda}, Intente luego`,`${repuesta.respuesta}`);
          this.form.reset()
          return
        }
        
        this._toastServices.success(`${repuesta.leyenda}`,`${repuesta.respuesta}`);
        this.router.navigate([''])
      },
      error: () =>{
        this.loading = false
        this._toastServices.error("Intente luego","Error")
      }
    })
  }
}