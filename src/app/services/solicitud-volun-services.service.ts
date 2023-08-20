import { Injectable } from '@angular/core';
import { IVoluntarios } from '../interfaces/ivoluntarios';

@Injectable({
  providedIn: 'root'
})
export class SolicitudVolunServicesService {

  constructor() { }
  solicitudes: IVoluntarios[] = [
    {
      id_Voluntarios: 1, nombres: "Juan",apellidos:"Vargas",cedula:"0832132153",edad:45, telefono: "1234567890",
      experiencia:"Ninguna" ,motivacion: "Querer cuidar a los animales y su habitat",estado: true
    }
  ];



getSolicitudes(){
  return this.solicitudes.filter(e => e.estado === true)

}

addActividad(solicitudNew: IVoluntarios){
  this.solicitudes.push(solicitudNew)
}

updateActividad(solicitudUpdate: IVoluntarios) {
  this.solicitudes.forEach(elemento => {
    if (elemento.id_Voluntarios === solicitudUpdate.id_Voluntarios) {
      Object.assign(elemento, solicitudUpdate);
    }
  });
}

deleteActividad(id: number){
  this.solicitudes.forEach(elemento => {
    if(elemento.id_Voluntarios === id){
      elemento.estado = false
    }
  })
}

}
