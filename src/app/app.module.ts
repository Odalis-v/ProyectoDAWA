//Modules
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Components
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './layouts/footer/footer.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { NavComponentComponent } from './layouts/nav-component/nav-component.component';
import { InicioComponentComponent } from './components/inicio-component/inicio-component.component';
import { ActividadesPageComponent } from './components/actividades-page/actividades-page.component';
import { AdministratorModuleComponent } from './modules/dashboard/administrator-module/administrator-module.component';
import { CarouselActividadesPageComponent } from './layouts/carousel-actividades-page/carousel-actividades-page.component';
import { ActividadesMatutinasLayoutsComponent } from './layouts/actividades-matutinas-layouts/actividades-matutinas-layouts.component';
import { ActividadesVespertinasLayoutsComponent } from './layouts/actividades-vespertinas-layouts/actividades-vespertinas-layouts.component';
import { VoluntariosComponentComponent } from './components/voluntarios-component/voluntarios-component.component';
import { RegistrarVoluntariosComponent } from './components/registrar-voluntarios/registrar-voluntarios.component';
import { NosotrosComponentComponent } from './components/nosotros-component/nosotros-component.component';
import { AnimalesPageComponent } from './components/animales-page/animales-page.component';
import { CarouselAnimalesPageComponent } from './layouts/carousel-animales-page/carousel-animales-page.component';
import { SettingActivitiesDefaultComponent } from './modules/dashboard/actitividades-module/setting-activities-default/setting-activities-default.component';
import { SettingActivitiesAddeditComponent } from './modules/dashboard/actitividades-module/setting-activities-addedit/setting-activities-addedit.component';
import { SettingActivitiesDeleteComponent } from './modules/dashboard/actitividades-module/setting-activities-delete/setting-activities-delete.component';
import { SettingActivitiesInfoComponent } from './modules/dashboard/actitividades-module/setting-activities-info/setting-activities-info.component';
import { AnimalesListaLayoutsComponent } from './layouts/animales-lista-layouts/animales-lista-layouts.component';
import { ListasVoluntariosComponent } from './layouts/listas-voluntarios/listas-voluntarios.component';
import { SettingAnimalesDefaultComponent } from './modules/dashboard/animales-module/setting-animales-default/setting-animales-default.component';
import { SettingAnimalesAddeditComponent } from './modules/dashboard/animales-module/setting-animales-addedit/setting-animales-addedit.component';
import { SettingAnimalesDeleteComponent } from './modules/dashboard/animales-module/setting-animales-delete/setting-animales-delete.component';
import { SettingAnimalesInfoComponent } from './modules/dashboard/animales-module/setting-animales-info/setting-animales-info.component';
import { SettingVoluntariosAddeditComponent } from './modules/dashboard/voluntarios-module/setting-voluntarios-addedit/setting-voluntarios-addedit.component';
import { SettingVoluntariosDefaultComponent } from './modules/dashboard/voluntarios-module/setting-voluntarios-default/setting-voluntarios-default.component';
import { SettingVoluntariosDeleteComponent } from './modules/dashboard/voluntarios-module/setting-voluntarios-delete/setting-voluntarios-delete.component';
import { SettingVoluntariosInfoComponent } from './modules/dashboard/voluntarios-module/setting-voluntarios-info/setting-voluntarios-info.component';
import { CarouselVoluntariosPageComponent } from './layouts/carousel-voluntarios-page/carousel-voluntarios-page.component';
import { SettingPersonalizadoDefaultComponent } from './modules/dashboard/actividades-personalizadas-module/setting-personalizado-default/setting-personalizado-default.component';
import { SettingPersonalizadoDeleteComponent } from './modules/dashboard/actividades-personalizadas-module/setting-personalizado-delete/setting-personalizado-delete.component';
import { SettingPersonalizadoEditComponent } from './modules/dashboard/actividades-personalizadas-module/setting-personalizado-edit/setting-personalizado-edit.component';
import { SettingPersonalizadoInfoComponent } from './modules/dashboard/actividades-personalizadas-module/setting-personalizado-info/setting-personalizado-info.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './shared/spinner.component';
import { SettingSolicitudVDefaultComponent } from './modules/dashboard/solicitud_voluntarios/setting-solicitud-v-default/setting-solicitud-v-default.component';
import { SettingSolicitudVDeleteComponent } from './modules/dashboard/solicitud_voluntarios/setting-solicitud-v-delete/setting-solicitud-v-delete.component';
import { SettingSolicitudVEditComponent } from './modules/dashboard/solicitud_voluntarios/setting-solicitud-v-edit/setting-solicitud-v-edit.component';
import { SettingSolicitudVInfoComponent } from './modules/dashboard/solicitud_voluntarios/setting-solicitud-v-info/setting-solicitud-v-info.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponentComponent,
    FooterComponent,
    InicioComponentComponent,
    ActividadesPageComponent,
    CarouselActividadesPageComponent,
    LoginComponent,
    ActividadesPageComponent,
    ActividadesMatutinasLayoutsComponent,
    ActividadesVespertinasLayoutsComponent,
    AdministratorModuleComponent,
    VoluntariosComponentComponent,
    RegistrarVoluntariosComponent,
    NosotrosComponentComponent,
    AnimalesPageComponent,
    CarouselAnimalesPageComponent,
    SettingActivitiesDefaultComponent,
    SettingActivitiesAddeditComponent,
    SettingActivitiesDeleteComponent,
    SettingActivitiesInfoComponent,
    AnimalesListaLayoutsComponent,
    ListasVoluntariosComponent,
    SettingAnimalesDefaultComponent,
    SettingAnimalesAddeditComponent,
    SettingAnimalesDeleteComponent,
    SettingAnimalesInfoComponent,
    SettingVoluntariosAddeditComponent,
    SettingVoluntariosDefaultComponent,
    SettingVoluntariosDeleteComponent,
    SettingVoluntariosInfoComponent,
    CarouselVoluntariosPageComponent,
    SettingPersonalizadoDefaultComponent,
    SettingPersonalizadoDeleteComponent,
    SettingPersonalizadoEditComponent,
    SettingPersonalizadoInfoComponent,
    SpinnerComponent,
    SettingSolicitudVDefaultComponent,
    SettingSolicitudVDeleteComponent,
    SettingSolicitudVEditComponent,
    SettingSolicitudVInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    LayoutModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
