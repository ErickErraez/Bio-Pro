import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Adjuntos} from '../Models/Adjuntos';
import {environment} from '../../environments/environment';
import {Usuario} from '../Models/Usuario';
import {Timbrada} from '../Models/Timbrada';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.url + 'user/';

  constructor(private http: HttpClient) {
    console.log('hola')
  }

  actualizarFoto(image: Adjuntos) {
    return this.http.post(this.url + 'foto', image);
  }

  uploadFile(image: Adjuntos) {
    return this.http.post(this.url + 'justification', image);
  }

  updateTimbrada(timbrada: Timbrada) {
    return this.http.post(this.url + 'justificationTimbrada', timbrada);
  }

  actualizarUsuarioFoto(usuario: Usuario) {
    return this.http.post(this.url + 'userFoto', usuario);
  }

  addUser(usuario: Usuario) {
    return this.http.post(this.url + 'addUSer', usuario);
  }

  getUserAdmin(idRoles) {
    return this.http.get(this.url + `getAdmin/${idRoles}`)
  }

  getUserByEmail(email) {
    return this.http.get(this.url + 'getUserEmail/' + email)
  }

  actualizarPassword(usuario: Usuario) {
    return this.http.post(this.url + 'userPassword', usuario);
  }
}
