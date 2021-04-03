import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AlertService} from '../services/alert.service';
import {Router} from '@angular/router';
import {Usuario} from '../Models/Usuario';
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  tipoInput: any = 'pass';
  changePass = {
    oldPassword: '',
    newPassword: '',
    idUsuarios: 0,
  };
  usuario: Usuario = new Usuario();
  pass = '';
  email = '';
  showLogin = true;
  repPass = '';
  contactForm: FormGroup;
  private passwordPattern: any = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  createFormGroup() {
    return new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
    });
  }

  constructor(private auth: AuthService, private alert: AlertService, private router: Router) {
    this.contactForm = this.createFormGroup();
  }

  ngOnInit(): void {

  }
  login() {
    if (this.pass !== '' && this.email !== '') {
      const data = {pass: this.pass, email: this.email};
      this.auth.login(data).subscribe(res => {
        this.auth.setToken(res.session_id);
        if (res.user.newpassword !== '0') {
          this.alert.showNotification('success', 'pe-7s-bell', res.message);
          this.router.navigate(['/']);
        } else {
          this.changePass.oldPassword = this.pass;
          this.usuario = res.user;
          this.changePass.idUsuarios = res.user.idUsuarios;
          this.showLogin = false;
        }

      }, err => {
        if (err.error.mensaje === 'Error: CustomError: EmptyResponse') {
          this.alert.showNotification('danger', 'pe-7s-bell', 'USUARIO/CONTRASEA INCORRECTOS');
        } else {
          this.alert.showNotification('danger', 'pe-7s-bell', err.error.mensaje);
        }
        sessionStorage.clear();
      });
    } else {
      this.alert.showNotification('warning', 'pe-7s-bell', 'DATOS INCOMPLETOS');
    }

  }


  updatePass() {
    if (this.changePass.oldPassword !== '' && this.changePass.newPassword !== '' && this.repPass !== '') {
      if (this.changePass.newPassword === this.repPass) {
        this.auth.actualizarPassword(this.changePass).subscribe((res: any) => {
          this.usuario.newpassword = '1';
          this.auth.actualizarUsuarioFoto(this.usuario).subscribe((usuario: Usuario) => {
            this.alert.showNotification('success', 'pe-7s-bell', res.mensaje);
            this.router.navigate(['/']);
          });
        }, err => {
          if (err.error.mensaje === 'Error: CustomError: EmptyResponse') {
            this.alert.showNotification('danger', 'pe-7s-bell', 'Error en el servidor');
          } else {
            this.alert.showNotification('danger', 'pe-7s-bell', err.error.mensaje);
          }
        });
      } else {
        this.alert.showNotification('danger', 'pe-7s-bell', 'Las contraseñas no son iguales');
      }
    } else {
      this.alert.showNotification('warning', 'pe-7s-bell', 'Existen campos vacíos');
    }
  }

  mostrarContrasena(item) {
    if (item === 'pass') {
      this.tipoInput = 'text';
    }
    if (item === 'text') {
      this.tipoInput = 'pass';
    }
  }
  get newPassword() {
    return this.contactForm.get('newPassword')
  }
}
