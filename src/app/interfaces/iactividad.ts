import { IHorario } from "./ihorario";

export interface IActividadInformacion{
    id_ActividadInformacion?:   number,
    horario?:                   IHorario,
    cantidadPersonas?:          number,
    cantidadGuias?:             number,
    precio?:                    number,
    descripcion?:               string
}

export interface IActividad {
    actividadInformacion:       IActividadInformacion,
    nombre?:                    string,
    tiempo?:                    string,
    imagen?:                    string,
    estado?:                    boolean,
    transaccion?:               string,
    expanded?:                  boolean;     
}

export interface IPersonalizado {
    actividadInformacion:       IActividadInformacion,
    nombreUsuario?:             string,
    telefono?:                  number,
    fecha?:                     Date,
    estado?:                    boolean,
    transaccion:                string
}