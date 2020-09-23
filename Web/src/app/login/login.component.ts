import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AlertService} from '../services/alert.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  pass = '';
  email = '';

  constructor(private auth: AuthService, private alert: AlertService, private router: Router) {
  }

  ngOnInit(): void {

  }

  login() {
    if (this.pass !== '' && this.email !== '') {
      const data = {pass: this.pass, email: this.email};
      this.auth.login(data).subscribe(res => {
        this.auth.setToken(res.session_id);
        this.alert.showNotification('success', 'pe-7s-bell', res.message);
        this.router.navigate(['/']);
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


}
