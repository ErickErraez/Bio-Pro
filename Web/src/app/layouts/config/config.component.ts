import {Component, OnInit} from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {AuthService} from "../../services/auth.service";
import {Usuario} from "../../Models/Usuario";
import {Router} from "@angular/router";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  changePass = {
    oldPassword: '',
    newPassword: '',
    idUsuarios: 0,
  };
  repPassword: '';
  usuario: Usuario = new Usuario();


  constructor(private auth: AuthService, private alert: AlertService, private route: Router) {
    this.usuario = auth.validarToken();
  }

  ngOnInit(): void {
  }

   actualizarPassword() {
    if (this.changePass.oldPassword !== '' && this.changePass.newPassword !== '' && this.repPassword !== '') {
      if (this.changePass.newPassword === this.repPassword) {
        this.changePass.idUsuarios = this.usuario.idUsuarios;
        this.auth.actualizarPassword(this.changePass).subscribe((res: any) => {
         // console.log(this.changePass);
         this.alert.showNotification('success', 'pe-7s-bell', res.mensaje);
           localStorage.clear();
          this.route.navigate(['/login']);
        }, err => {
          if (err.error.mensaje === 'Error: CustomError: EmptyResponse') {
            this.alert.showNotification('danger', 'pe-7s-bell', 'Error en el servidor');
          } else {
            this.alert.showNotification('danger', 'pe-7s-bell', err.error.mensaje);
          }
        })
      } else {
        this.alert.showNotification('danger', 'pe-7s-bell', 'Las contraseñas no son iguales');
      }
    } else {
      this.alert.showNotification('warning', 'pe-7s-bell', 'Existen campos vacíos');
    }
  }

}
