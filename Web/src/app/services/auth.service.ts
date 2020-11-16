import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Usuario} from '../Models/Usuario';
import {Timbrada} from '../Models/Timbrada';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.url + 'auth/';

  constructor(private http: HttpClient, private router: Router) {

  }

  login(data): any {
    return this.http.post(this.url + 'login', data);
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  actualizarPassword(data) {
    return this.http.post(this.url + 'changePassword', data);
  }

  validarToken() {
    const token = this.getToken();
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload).user;
    } else {
      return false;
    }

  }

  actualizarUsuarioFoto(usuario: Usuario) {
    return this.http.post(this.url + 'updateUser', usuario);
  }


  getUser() {
    return this.http.get(this.url + 'getUsers');
  }

  getData(timbrada: Timbrada) {
    return this.http.post(this.url + 'getData', timbrada);
  }

  saveFile(timbrada: Timbrada) {
    return this.http.post(this.url + 'saveFile', timbrada);
  }

}
