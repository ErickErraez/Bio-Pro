import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Usuario} from '../Models/Usuario';

declare const $: any;

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  permiso: string;
}

export const ROUTES: RouteInfo[] = [
  {path: 'principal', title: 'Principal', icon: 'pe-7s-graph', class: '', permiso: 'ALL'},
  {path: 'configuracion', title: 'Administración', icon: 'pe-7s-config', class: '', permiso: 'ALL'},
  {path: 'addUsers', title: 'Agregar / Editar Usuarios', icon: 'pe-7s-user', class: '', permiso: 'ADMINISTRADOR'},
  {path: 'informes', title: 'Informes', icon: 'pe-7s-folder', class: '', permiso: 'ADMINISTRADOR'}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  usuario: Usuario = new Usuario();

  constructor(private auth: AuthService, private route: Router) {
    this.usuario = auth.validarToken();
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  logout() {
    localStorage.clear();
    this.route.navigate(['/login']);
  }
}
