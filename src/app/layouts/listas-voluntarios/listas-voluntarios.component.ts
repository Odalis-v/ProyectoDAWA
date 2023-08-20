import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GET_VOLUNTARIOS } from 'src/app/interfaces/itransacciones';
import { IVoluntarios } from 'src/app/interfaces/ivoluntarios';
import { ToastService } from 'src/app/services/toast.service';
import { VoluntariosService } from 'src/app/services/voluntarios-service.service';

@Component({
  selector: 'app-listas-voluntarios',
  templateUrl: './listas-voluntarios.component.html',
  styleUrls: ['./listas-voluntarios.component.css']
})
export class ListasVoluntariosComponent implements OnInit {
  people: IVoluntarios[] = [];
  loading: boolean = false;  

  constructor(
    private dialog:MatDialog,
    private _voluntariosServices: VoluntariosService,
    private _toastServices: ToastService,
    private router: Router
  ){}

  ngOnInit(){
    this.obtenerVoluntarios();
  }

  showModal = false;
  selectedPerson?: IVoluntarios;

  openModal(person: IVoluntarios) {
    this.selectedPerson = person;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  obtenerVoluntarios(){
    this.loading = true;
    this._voluntariosServices.getVoluntarios().subscribe({
      next: (data) =>{        
        this.loading = false;
        this.people = data;
      },
      error: (e) => {
        this.loading = false
        this.router.navigate([''])
        this._toastServices.error("Problemas con el servidor","Error")
      }
    })
  }      
}
