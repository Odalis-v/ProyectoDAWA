import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IActividad } from 'src/app/interfaces/iactividad';
import { ActividadServiceService } from 'src/app/services/actividad-service.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-actividades-vespertinas-layouts',
  templateUrl: './actividades-vespertinas-layouts.component.html',
  styleUrls: ['./actividades-vespertinas-layouts.component.css']
})
export class ActividadesVespertinasLayoutsComponent implements OnInit{

  actividades!: IActividad[];
  loading: boolean = false;
  paginatedActividades: IActividad[] = [];
  pageSize = 3;
  currentPage = 0;

  constructor(
    private _actividadesServices: ActividadServiceService,
    private router: Router,
    private _toastServices: ToastService
    ) {}

  ngOnInit() {
    this.obtenerActividades();
  }

  obtenerActividades(){
    this.loading = true;
    this._actividadesServices.getActividades().subscribe({
      next: (data) =>{
        this.loading = false;
        this.actividades = data.filter(e => e.actividadInformacion.horario?.hora?.includes('P.M'));
        this.updatePaginatedActividades();
      },
      error: (e) => {
        this.loading = false
        this.router.navigate([''])
        this._toastServices.error("Problemas con el servidor","Error")
      }
    })
  }    

  updatePaginatedActividades() {
    const startIndex = this.currentPage * this.pageSize;
    this.paginatedActividades = this.actividades?.slice(startIndex, startIndex + this.pageSize);
    this.paginatedActividades[0].expanded = true;
    for (let i = 1; i < this.paginatedActividades.length; i++) {
      this.paginatedActividades[i].expanded = false;
    }
  }
 
  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedActividades();
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePaginatedActividades();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedActividades();
    }
  }

  get totalPages() {
    return Math.ceil(this.actividades?.length / this.pageSize);
  }
}
