import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVoluntarios } from '../interfaces/ivoluntarios';
import { IRespuestaSP } from '../interfaces/irespuesta-sp';
import { GET_VOLUNTARIOS } from '../interfaces/itransacciones';
import  {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoluntariosService {
  
  private myAppUrl:string   = environment.endpoint;
  private myApiUrl:string   = 'api/Voluntarios/Voluntarios/';

  constructor(private http:HttpClient) {}

  getVoluntarios():Observable<IVoluntarios[]>{
    return this.http.get<IVoluntarios[]>(`${this.myAppUrl}${this.myApiUrl}${GET_VOLUNTARIOS}`);
  }
  crudVoluntarios(voluntario: IVoluntarios): Observable<IRespuestaSP>{
    let auth_token = localStorage.getItem('token_value');
    const header = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`bearer ${auth_token}`
    });

    return this.http.post<IRespuestaSP>(`${this.myAppUrl}${this.myApiUrl}`,voluntario,{headers:header});
  }
} 