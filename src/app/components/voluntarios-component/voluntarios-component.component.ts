import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarVoluntariosComponent } from '../registrar-voluntarios/registrar-voluntarios.component';
import { IRespuestaSP } from 'src/app/interfaces/irespuesta-sp';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-voluntarios-component',
  templateUrl: './voluntarios-component.component.html',
  styleUrls: ['./voluntarios-component.component.css']
})
export class VoluntariosComponentComponent{
  constructor(
    private dialog:MatDialog,
    private _toastServices: ToastService
    ){}
  
  openDialog(){
    this.dialog.open(RegistrarVoluntariosComponent, {
      autoFocus: false,
      width: 'auto',
    }).afterClosed().subscribe(
      (datosCierre) => {
        if(datosCierre == "error" || datosCierre.respuesta === 'ERROR'){
          this._toastServices.error(`${datosCierre.leyenda}, Intente luego`,`${datosCierre.respuesta}`);       
          return
        }
        if((datosCierre.resultado == "agregado")){
          this._toastServices.success(`${datosCierre.leyenda}`,`${datosCierre.respuesta}`);
        }
      }
    ) 
  }

}
