import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { IUsuario } from './interfaces/iusuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private myAppUrl:string = environment.endpoint;
private myApiUrl:string = 'api/Usuarios/GetLogin';


  constructor(private http: HttpClient) { }

  login(user:IUsuario){
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  get getUserName(){
    return  localStorage.getItem('userName');
  }
  
  get isAutenticado(){
    return !!localStorage.getItem('token_value');
  }
}
