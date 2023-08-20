import { SettingActivitiesAddeditComponent } from './../setting-activities-addedit/setting-activities-addedit.component';
import { SettingActivitiesDeleteComponent } from '../setting-activities-delete/setting-activities-delete.component';
import { SettingActivitiesInfoComponent } from '../setting-activities-info/setting-activities-info.component';
import { ActividadServiceService } from 'src/app/services/actividad-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IActividad } from 'src/app/interfaces/iactividad';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-activities-default',
  templateUrl: './setting-activities-default.component.html',
  styleUrls: ['./setting-activities-default.component.css']
})
export class SettingActivitiesDefaultComponent implements OnInit{
  displayedColumns: string[] = ['nombre', 'cantidadPersonas', 'precio', 'hora', 'time','accion'];
  dataSource = new MatTableDataSource<IActividad>();
  loading: boolean = false;  

  constructor(
    private _actividadesServices: ActividadServiceService,
    public dialog: MatDialog,
    private _toastServices: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerActividades();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  obtenerActividades(){
    this.loading = true;
    this._actividadesServices.getActividades().subscribe({
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

  openAdd(){
    this.dialog.open(SettingActivitiesAddeditComponent,{
      autoFocus: false,
      disableClose: true,
      width: '50%',
      height: '500px'
    }).afterClosed().subscribe(
      (datosCierre) => {
        if(datosCierre == "error" || datosCierre.respuesta === 'ERROR'){
          this.obtenerActividades();
          this._toastServices.error(`${datosCierre.leyenda}, Intente luego`,`${datosCierre.respuesta}`);       
          return
        }
        if((datosCierre.resultado == "agregado")){
          this.obtenerActividades();
          this._toastServices.success(`${datosCierre.leyenda}`,`${datosCierre.respuesta}`);
        }
      }
    )
  }

  openEdit(actividadData: IActividad){
    this.dialog.open(SettingActivitiesAddeditComponent,{
      autoFocus: false,
      disableClose: true,
      width: '50%',
      data: actividadData
    }).afterClosed().subscribe(
      (datosCierre) => {
        if(datosCierre == "error" || datosCierre.respuesta === 'ERROR'){
          this.obtenerActividades();
          this._toastServices.error(`${datosCierre.leyenda}, Intente luego`,`${datosCierre.respuesta}`);  
          return
        }
        if((datosCierre.resultado == "actualizado")){
          this.obtenerActividades();
          this._toastServices.success(`${datosCierre.leyenda}`,`${datosCierre.respuesta}`);
        }
      }
    )
  }

  openDelete(actividadData: IActividad){
    this.dialog.open(SettingActivitiesDeleteComponent,{
      width: '20%',
      data: actividadData
    }).afterClosed().subscribe(
      (datosCierre) => {
        if(datosCierre == "error" || datosCierre.respuesta === 'ERROR'){
          this.obtenerActividades();
          this._toastServices.error(`${datosCierre.leyenda}, Intente luego`,`${datosCierre.respuesta}`);  
          return
        }
        if((datosCierre.resultado == "eliminado")){
          this.obtenerActividades();
          this._toastServices.success(`${datosCierre.leyenda}`,`${datosCierre.respuesta}`);
        }
      }
    )
  }

  openInfo(actividadData: IActividad){
    this.dialog.open(SettingActivitiesInfoComponent,{
      width: '50%',
      data: actividadData      
    })
  }
  
}
