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

  tipoInput: any = 'password';
  changePass = {
    oldPassword: 'yavirac2020',
    newPassword: '',
    idUsuarios: 0,
  };
  usuario: Usuario = new Usuario();
  pass = '';
  email = '';
  showLogin = true;
  repPass = '';
  passForm: FormGroup;
  private passwordPattern: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

  createFormGroup() {
    return new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8),  Validators.pattern(this.passwordPattern)]),
      repPasss: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  constructor(private auth: AuthService, private alert: AlertService, private router: Router) {
    this.passForm = this.createFormGroup();
  }

  ngOnInit(): void {

  }

  login() {
    this.email = this.email.toLocaleLowerCase();
    if (this.email.search('@') === -1) {
      this.email = this.email + '@yavirac.edu.ec';
    }
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
        localStorage.clear();
      });
    } else {
      this.alert.showNotification('warning', 'pe-7s-bell', 'DATOS INCOMPLETOS');
    }

  }


  updatePass() {
    console.log(this.changePass.oldPassword, this.changePass.newPassword, this.repPass);
    if (this.changePass.oldPassword !== '' && this.changePass.newPassword !== '' && this.repPass !== '') {
      if (this.changePass.newPassword === this.repPass) {
        this.auth.actualizarPassword(this.changePass).subscribe((res: any) => {
          this.usuario.newpassword = '1';
          this.auth.actualizarUsuarioFoto(this.usuario).subscribe((usuario: any) => {
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
    if (item === 'password') {
      this.tipoInput = 'text';
    }
    if (item === 'text') {
      this.tipoInput = 'password';
    }
  }

  get newPassword() {
    return this.passForm.get('newPassword')
  }

  get repPasss() {
    return this.passForm.get('repPasss')
  }
}
