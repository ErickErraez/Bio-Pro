import {Usuario} from './Usuario';
import {Adjuntos} from './Adjuntos';

export class Timbrada {
  idTimbradas?: number;
  fecha: string;
  entrada: string;
  almuerzo: string;
  regresoAlmuerzo: string;
  salida: string;
  usuario: Usuario;
  justificacion: Adjuntos;
}
