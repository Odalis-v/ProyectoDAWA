import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IActividad } from '../interfaces/iactividad';
import { GET_ACTIVIDADES, GET_HORARIOS } from '../interfaces/itransacciones';
import { IRespuestaSP } from '../interfaces/irespuesta-sp';
import { IHorario } from '../interfaces/ihorario';
import  {HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ActividadServiceService {
  
  private myAppUrl:string   = environment.endpoint;
  private myApiUrl:string   = 'api/Actividades/Actividad/';
  private myApiUrl2:string  = 'api/Actividades/Horario/';

  constructor(private http:HttpClient) { }

  getHorarios(): Observable<IHorario[]>{
    return this.http.get<IHorario[]>(`${this.myAppUrl}${this.myApiUrl2}${GET_HORARIOS}`);
  }

  getActividades(): Observable<IActividad[]> {
    return this.http.get<IActividad[]>(`${this.myAppUrl}${this.myApiUrl}${GET_ACTIVIDADES}`);
  }

  crudActividad(actividad: IActividad): Observable<IRespuestaSP>{
    let auth_token = localStorage.getItem('token_value');
    const header = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`bearer ${auth_token}`
    });
    return this.http.post<IRespuestaSP>(`${this.myAppUrl}${this.myApiUrl}`,actividad,{headers:header});
  }

}