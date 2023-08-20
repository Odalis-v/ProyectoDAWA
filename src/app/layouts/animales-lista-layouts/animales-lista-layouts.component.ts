import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from 'src/app/shared/ImageDialogComponent';
import { IAnimales } from 'src/app/interfaces/ianimales';
import { AnimalesService } from 'src/app/services/animales-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animales-lista-layouts',
  templateUrl: './animales-lista-layouts.component.html',
  styleUrls: ['./animales-lista-layouts.component.css']
})
export class AnimalesListaLayoutsComponent implements OnInit{
 
  animales! : IAnimales[];
  loading:boolean = false;
  paginasAnimales : IAnimales[]=[]
  tamañoPagina = 5;
  paginaActual =0;

  constructor(
    private animalesServices : AnimalesService,
    private dialog: MatDialog,
    private router: Router,
    private _toastServices: ToastService
    ){}


  ngOnInit(){
    this.obtenerAnimales();
  }

  //Zoom Imagen
  openDialog(imageUrl: string): void {
    this.dialog.open(ImageDialogComponent, {
      data: { imageUrl },
      panelClass: 'custom-dialog-container' // Clase CSS personalizada para el diálogo
    });
  }


  obtenerAnimales(){
    this.loading = true;
    this.animalesServices.getAnimales().subscribe({
      next: (data) =>{      
        this.loading = false;
        this.animales = data.filter(e => e.id_animales);
        this.updatePaginatedAnimales();                  
      },
      error: (e) => {
        this.loading = false
        this.router.navigate([''])
        this._toastServices.error("Problemas con el servidor","Error")
      }
    })
  }
  

  updatePaginatedAnimales() {
    const startIndex = this.paginaActual * this.tamañoPagina;
    this.paginasAnimales = this.animales.slice(startIndex, startIndex + this.tamañoPagina);
    this.paginasAnimales[0].expanded = true;
    for (let i = 1; i < this.paginasAnimales.length; i++) {
      this.paginasAnimales[i].expanded = false;
    }
  }

  goToPage(page: number) {
    this.paginaActual = page;
    this.updatePaginatedAnimales();
  }

  nextPage() {
    if (this.paginaActual < this.totalPages - 1) {
      this.paginaActual++;
      this.updatePaginatedAnimales();
    }
  }

  previousPage() {
    if (this.paginaActual > 0) {
      this.paginaActual--;
      this.updatePaginatedAnimales();
    }
  }

  get totalPages() {
    return Math.ceil(this.animales.length / this.tamañoPagina);
  }

}
