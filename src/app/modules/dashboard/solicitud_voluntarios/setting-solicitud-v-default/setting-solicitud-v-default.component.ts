import { GET_SOLICITUDES } from './../../../../interfaces/itransacciones';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastService } from 'src/app/services/toast.service';
import { SettingSolicitudVEditComponent } from '../setting-solicitud-v-edit/setting-solicitud-v-edit.component';
import { SettingSolicitudVInfoComponent } from '../setting-solicitud-v-info/setting-solicitud-v-info.component';
import { SettingSolicitudVDeleteComponent } from '../setting-solicitud-v-delete/setting-solicitud-v-delete.component';
import { IVoluntarios } from 'src/app/interfaces/ivoluntarios';
import { Router } from '@angular/router';
import { VoluntariosService } from 'src/app/services/voluntarios-service.service';


@Component({
  selector: 'app-setting-solicitud-v-default',
  templateUrl: './setting-solicitud-v-default.component.html',
  styleUrls: ['./setting-solicitud-v-default.component.css']
})
export class SettingSolicitudVDefaultComponent implements OnInit{
  displayedColumns: string[] = ['nombres', 'apellidos', 'cedula', 'edad','telefono','accion'];
  dataSource = new MatTableDataSource<IVoluntarios>();
  loading: boolean = false;  

  constructor(
    private _solicitudService: VoluntariosService,
    public dialog: MatDialog,
    private _toastServices: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerSolicitud();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  obtenerSolicitud(){
    this.loading = true;
    this._solicitudService.getVoluntarios().subscribe({
      next: (data) =>{
        this.loading = false;
        this.dataSource.data = data;
      },
      error: (e) => {
        this.loading = false
        this.router.navigate([''])
        this._toastServices.error("Problemas con el servidor","Error")
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0){
      this.paginator._intl.itemsPerPageLabel = "Items por Página ";
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 

  openEdit(actividadData: IVoluntarios){
     this.dialog.open(SettingSolicitudVEditComponent,{
      autoFocus: false,
      disableClose: true,
      width: 'auto',
      data: actividadData
    }).afterClosed().subscribe(
      (datosCierre) => {
        if(datosCierre == "error" || datosCierre.respuesta === 'ERROR'){
          this.obtenerSolicitud();
          this._toastServices.error(`${datosCierre.leyenda}, Intente luego`,`${datosCierre.respuesta}`);       
          return
        }
        if((datosCierre.resultado == "actualizado")){
          this.obtenerSolicitud();
          this._toastServices.success(`${datosCierre.leyenda}`,`${datosCierre.respuesta}`);
        }
      }
    )
  }

  openAceptar(actividadData: IVoluntarios){
     this.dialog.open(SettingSolicitudVDeleteComponent,{
      width: '20%',
      data: {
        actividadData: actividadData,
        bandera: "aceptar"
      }
    }).afterClosed().subscribe(
      (datosCierre) => {
        if(datosCierre == "error" || datosCierre.respuesta === 'ERROR'){
          this.obtenerSolicitud();
          this._toastServices.error(`${datosCierre.leyenda}, Intente luego`,`${datosCierre.respuesta}`);       
          return
        }
        if((datosCierre.resultado == "respuesta")){
          this.obtenerSolicitud();
          this._toastServices.success(`${datosCierre.leyenda}`,`${datosCierre.respuesta}`);
        }
      }
    ) 
  }

  openRechazar(actividadData: IVoluntarios){
    this.dialog.open(SettingSolicitudVDeleteComponent,{
     width: '20%',
     data: {
      actividadData: actividadData
    }
   }).afterClosed().subscribe(
     (datosCierre) => {
       if(datosCierre == "error" || datosCierre.respuesta === 'ERROR'){
         this.obtenerSolicitud();
         this._toastServices.error(`${datosCierre.leyenda}, Intente luego`,`${datosCierre.respuesta}`);       
         return
       }
       if((datosCierre.resultado == "respuesta")){
         this.obtenerSolicitud();
         this._toastServices.success(`${datosCierre.leyenda}`,`${datosCierre.respuesta}`);
       }
     }
   ) 
 }

  openInfo(actividadData: IVoluntarios){
     this.dialog.open(SettingSolicitudVInfoComponent,{
      width: 'auto',
      data: actividadData      
     }) 
  }
  
}
