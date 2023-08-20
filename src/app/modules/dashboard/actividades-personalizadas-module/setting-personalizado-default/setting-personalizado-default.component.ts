import { SettingPersonalizadoDeleteComponent } from './../setting-personalizado-delete/setting-personalizado-delete.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPersonalizado } from 'src/app/interfaces/iactividad';
import { ActividadPersonalizadaServicesService } from 'src/app/services/actividad-personalizada-services.service';
import { ToastService } from 'src/app/services/toast.service';
import { SettingPersonalizadoEditComponent } from '../setting-personalizado-edit/setting-personalizado-edit.component';
import { SettingPersonalizadoInfoComponent } from '../setting-personalizado-info/setting-personalizado-info.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-personalizado-default',
  templateUrl: './setting-personalizado-default.component.html',
  styleUrls: ['./setting-personalizado-default.component.css']
})
export class SettingPersonalizadoDefaultComponent implements OnInit{
  displayedColumns: string[] = ['nombreUsuario', 'cantidadPersonas', 'hora', 'fecha','accion'];
  dataSource = new MatTableDataSource<IPersonalizado>();
  loading: boolean = false;  

  constructor(
    private _actividadesServices: ActividadPersonalizadaServicesService,
    private _toastServices: ToastService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerActividades();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  obtenerActividades(){
    this.loading = true;
    this._actividadesServices.getPersonalizados().subscribe({
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
 
  openEdit(actividadData: IPersonalizado){
     this.dialog.open(SettingPersonalizadoEditComponent,{
      autoFocus: false,
      disableClose: true,
      width: 'auto',
      data: actividadData
    }).afterClosed().subscribe(
      (datosCierre) => {
        if(datosCierre == "error"){
          this.obtenerActividades();
          this._toastServices.success("Ha ocurrido un error inesperado","Lo sentimos")
          return
        }
        if((datosCierre.resultado == "actualizado")){
          this.obtenerActividades();
          this._toastServices.success(`${datosCierre.leyenda}`,`${datosCierre.respuesta}`);
        }
      }
    )
  }

  openDelete(actividadData: IPersonalizado){
     this.dialog.open(SettingPersonalizadoDeleteComponent,{
      width: '20%',
      data: actividadData
    }).afterClosed().subscribe(
      (datosCierre) => {
        if(datosCierre == "error"){
          this.obtenerActividades();
          this._toastServices.success("Ha ocurrido un error inesperado","Lo sentimos")
          return
        }
        if((datosCierre.resultado == "eliminado")){
          this.obtenerActividades();
          this._toastServices.success(`${datosCierre.leyenda}`,`${datosCierre.respuesta}`);
        }
      }
    )
  }

  openInfo(actividadData: IPersonalizado){
     this.dialog.open(SettingPersonalizadoInfoComponent,{
      width: 'auto',
      data: actividadData      
     }) 
  }
  
}
