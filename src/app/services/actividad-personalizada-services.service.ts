import { Injectable } from '@angular/core';
import { IPersonalizado } from '../interfaces/iactividad';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRespuestaSP } from '../interfaces/irespuesta-sp';
import { GET_PERSONALIZADOS } from '../interfaces/itransacciones';
import  {HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ActividadPersonalizadaServicesService {

  private myAppUrl:string = environment.endpoint;
  private myApiUrl:string = 'api/Actividades/Personalizado/';
  private myApiUrl2:string = 'api/Actividades/Personalizado/Admin/';

  constructor(private http:HttpClient) { }

  getPersonalizados(): Observable<IPersonalizado[]> {
    let auth_token = localStorage.getItem('token_value');
    const header = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`bearer ${auth_token}`
    });
    return this.http.get<IPersonalizado[]>(`${this.myAppUrl}${this.myApiUrl}${GET_PERSONALIZADOS}`,{headers: header});
  }

  crudPersonalizado(personalizado: IPersonalizado): Observable<IRespuestaSP>{
    let auth_token = localStorage.getItem('token_value');
    const header = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`bearer ${auth_token}`
    });    
    return this.http.post<IRespuestaSP>(`${this.myAppUrl}${this.myApiUrl}`,personalizado,{headers: header});
  }

  AddPersonalizado(personalizado: IPersonalizado): Observable<IRespuestaSP>{
    return this.http.post<IRespuestaSP>(`${this.myAppUrl}${this.myApiUrl2}`,personalizado,);
  }

}
