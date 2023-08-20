import { SettingVoluntariosAddeditComponent } from '../setting-voluntarios-addedit/setting-voluntarios-addedit.component';
import { SettingVoluntariosDeleteComponent } from '../setting-voluntarios-delete/setting-voluntarios-delete.component';
import { SettingVoluntariosInfoComponent } from '../setting-voluntarios-info/setting-voluntarios-info.component';
import { VoluntariosService } from 'src/app/services/voluntarios-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IVoluntarios } from 'src/app/interfaces/ivoluntarios';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { GET_VOLUNTARIOS } from 'src/app/interfaces/itransacciones';
@Component({
  selector: 'app-setting-voluntarios-default',
  templateUrl: './setting-voluntarios-default.component.html',
  styleUrls: ['./setting-voluntarios-default.component.css']
})
export class SettingVoluntariosDefaultComponent implements OnInit{
  displayedColumns: string[] = ['nombres', 'cedula', 'edad', 'telefono', 'experiencia','accion'];
  dataSource = new MatTableDataSource<IVoluntarios>();
  loading: boolean = false;  

  constructor(
    private _voluntariosServices: VoluntariosService,
    public dialog: MatDialog,
    private _toastServices: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerVoluntarios();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  obtenerVoluntarios(){
    this.loading = true;
    this._voluntariosServices.getVoluntarios().subscribe({
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
    this.dialog.open(SettingVoluntariosAddeditComponent,{
      autoFocus: false,
      disableClose: true,
      width: '50%',
      height: 'Auto'
    }).afterClosed().subscribe(
      (datosCierre) => {
        if(datosCierre == "error" || datosCierre.respuesta === 'ERROR'){
          this.obtenerVoluntarios();
          this._toastServices.error(`${datosCierre.leyenda}, Intente luego`,`${datosCierre.respuesta}`);       
          return
        }
        if((datosCierre.resultado == "agregado")){
          this.obtenerVoluntarios();
          this._toastServices.success(`${datosCierre.leyenda}`,`${datosCierre.respuesta}`);
        }
      }
    )
  }

  openEdit(actividadData: IVoluntarios){
    this.dialog.open(SettingVoluntariosAddeditComponent,{
      autoFocus: false,
      disableClose: true,
      width: '50%',
      data: actividadData
    }).afterClosed().subscribe(
      (datosCierre) => {
        if(datosCierre == "error" || datosCierre.respuesta === 'ERROR'){
          this.obtenerVoluntarios();
          this._toastServices.error(`${datosCierre.leyenda}, Intente luego`,`${datosCierre.respuesta}`);  
          return
        }
        if((datosCierre.resultado == "actualizado")){
          this.obtenerVoluntarios();
          this._toastServices.success(`${datosCierre.leyenda}`,`${datosCierre.respuesta}`);
        }
      }
    )
  }

  openDelete(actividadData: IVoluntarios){
    this.dialog.open(SettingVoluntariosDeleteComponent,{
      width: '20%',
      data: actividadData
    }).afterClosed().subscribe(
      (datosCierre) => {
        if(datosCierre == "error" || datosCierre.respuesta === 'ERROR'){
          this.obtenerVoluntarios();
          this._toastServices.error(`${datosCierre.leyenda}, Intente luego`,`${datosCierre.respuesta}`);  
          return
        }
        if((datosCierre.resultado == "eliminado")){
          this.obtenerVoluntarios();
          this._toastServices.success(`${datosCierre.leyenda}`,`${datosCierre.respuesta}`);
        }
      }
    )
  }

  openInfo(actividadData: IVoluntarios){
    this.dialog.open(SettingVoluntariosInfoComponent,{
      width: '50%',
      data: actividadData      
    })
  }
  
}
