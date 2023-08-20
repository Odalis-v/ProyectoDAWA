import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IAnimales } from 'src/app/interfaces/ianimales';
import { AnimalesService } from 'src/app/services/animales-service.service';
import { ToastService } from 'src/app/services/toast.service';
import { SettingAnimalesAddeditComponent } from '../setting-animales-addedit/setting-animales-addedit.component';
import { SettingAnimalesDeleteComponent } from '../setting-animales-delete/setting-animales-delete.component';
import { SettingAnimalesInfoComponent } from '../setting-animales-info/setting-animales-info.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-animales-default',
  templateUrl: './setting-animales-default.component.html',
  styleUrls: ['./setting-animales-default.component.css']
})
export class SettingAnimalesDefaultComponent {
  displayedColumns: string[] = ['nombre', 'edad', 'especie', 'genero', 'origen', 'habitat','observaciones','accion'];
  dataSource = new MatTableDataSource<IAnimales>();
  loading: boolean = false;  

  constructor(
    private _animalesService: AnimalesService,
    public dialog: MatDialog,
    private toast: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerAnimales();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Truncar Texto -- Animales
  truncateText(text: string, maxLength: number): string {
    if (text && text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  }
  
  
  obtenerAnimales(){
    this.loading = true;
    this._animalesService.getAnimales().subscribe({
      next: (data) =>{
        this.loading = false;
        this.dataSource.data = data;
      },
      error: (e) => {
        this.loading = false
        this.router.navigate([''])
        this.toast.error("Problemas con el servidor","Error")
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
    this.dialog.open(SettingAnimalesAddeditComponent,{
      autoFocus: false,
      disableClose: true,
      width: '50%',
      height: '500px'
    }).afterClosed().subscribe(
      (datosCierre) => {
        if(datosCierre == "error" || datosCierre.respuesta === 'ERROR'){
          this.obtenerAnimales();
          this.toast.error(`${datosCierre.leyenda}, Intente luego`,`${datosCierre.respuesta}`);       
          return
        }
        if((datosCierre.resultado == "agregado")){
          this.obtenerAnimales();
          this.toast.success(`${datosCierre.leyenda}`,`${datosCierre.respuesta}`);
        }
      }
    )
  }

  openEdit(animalesData: IAnimales){
    this.dialog.open(SettingAnimalesAddeditComponent,{
      autoFocus: false,
      disableClose: true,
      width: '50%',
      data: animalesData
    }).afterClosed().subscribe(
      (datosCierre) => {
        if(datosCierre == "error" || datosCierre.respuesta === 'ERROR'){
          this.obtenerAnimales();
          this.toast.error(`${datosCierre.leyenda}, Intente luego`,`${datosCierre.respuesta}`);  
          return
        }
        if((datosCierre.resultado == "actualizado")){
          this.obtenerAnimales();
          this.toast.success(`${datosCierre.leyenda}`,`${datosCierre.respuesta}`);
        }
      }
    )
  }

  openDelete(animalesData: IAnimales){
    this.dialog.open(SettingAnimalesDeleteComponent,{
      width: '20%',
      data: animalesData
    }).afterClosed().subscribe(
      (datosCierre) => {
        if(datosCierre == "error" || datosCierre.respuesta === 'ERROR'){
          this.obtenerAnimales();
          this.toast.error(`${datosCierre.leyenda}, Intente luego`,`${datosCierre.respuesta}`);  
          return
        }
        if((datosCierre.resultado == "eliminado")){
          this.obtenerAnimales();
          this.toast.success(`${datosCierre.leyenda}`,`${datosCierre.respuesta}`);
        }
      }
    )
  }

  openInfo(animalesData: IAnimales){
    this.dialog.open(SettingAnimalesInfoComponent,{
      width: '100%',
      data: animalesData     
    })
  }
  
}
