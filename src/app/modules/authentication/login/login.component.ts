import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { IUsuario } from 'src/app/interfaces/iusuario';

import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  hide = true;
  loading: boolean = false;  
  usuarioTemp : any;
  passwordTemp : any;

  constructor (
    private toast: ToastService,
    private fb: FormBuilder,
    private _loginService: AuthService,
    private router: Router
    
  ) {}

  usuarioLogin = new FormGroup({
    cedula : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
    transaccion : new FormControl('')
  })

  onSubmit() {
    this.usuarioLogin.value.transaccion = "CONSULTAR_USUARIO_LOGIN";
    this.usuarioTemp = this.usuarioLogin.value.cedula;
    this.passwordTemp = this.usuarioLogin.value.password;
  
    this._loginService.login(this.usuarioLogin.value as IUsuario).subscribe(
      (data: any) => {
        console.log(data);
  
        // Verificar si la respuesta del servidor indica un inicio de sesión exitoso
        if (data) {
          localStorage.setItem('userName', this.usuarioTemp);
          localStorage.setItem('token_value', data);
          this.toast.success("Inicio de Sesion Exitoso","Bienvenido")
          this.router.navigate(['/administrator']);
        } else {
          this.toast.error("Error Inicio de Sesion","Credenciales Incorrectas")
        }
      },
      (errorData) => alert(errorData)
    );
  }  
}
