import {Component, OnInit} from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  changePass = {
    oldPassword: '',
    newPassword: '',
    repPassword: '',
  };


  constructor(private auth: AuthService, private alert: AlertService) {
  }

  ngOnInit(): void {
  }

  actualizarPassword() {
    if (this.changePass.oldPassword !== '' && this.changePass.newPassword !== '' && this.changePass.repPassword !== '') {
      if (this.changePass.newPassword === this.changePass.repPassword) {
        alert("paso1");
        alert("paso2");
        this.auth.actualizarPassword(this.changePass).subscribe(res => {
          alert("paso3")
          console.log(this.changePass);
          // this.alert.showNotification('success', 'pe-7s-bell', res.message);
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
