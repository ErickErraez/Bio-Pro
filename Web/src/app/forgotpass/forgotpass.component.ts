import {Component, OnInit} from '@angular/core';
import {MailerService} from '../services/mailer.service';
import {Email} from '../Models/Email';
import {UserService} from '../services/user.service';
import {Usuario} from '../Models/Usuario';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {

  email: Email = new Email();

  constructor(private mail: MailerService, private user: UserService, private alert: AlertService) {
  }

  ngOnInit(): void {

  }

  enviar() {
    this.user.getUserByEmail(this.email.emails).subscribe((res: any) => {
        res.usuario.newpassword = 0;
        res.usuario.password = '$2b$10$wN9wjB53XhvTFtYPSyBD.uOqb4GHFmMFWNKvwEi35ofFcBsmKEiey';
        console.log(res.usuario);
        this.user.actualizarPassword(res.usuario).subscribe(resp => {
          this.email.asunto = 'Recuperacion de Contraseña';
          this.email.body = 'SU NUEVA CLAVE ES: yavirac2020';
          this.email.body = this.mail.emailTemplate(this.email, 'Recuperacion de cuenta');
          this.mail.forgotPassword(this.email).subscribe(email => {
            this.email = new Email();
            this.alert.showNotification('success', 'pe-7s-bell', 'Se ha enviado su clave al correo');
          });
        });
      }, (error: any) => {
        this.alert.showNotification('danger', 'pe-7s-bell', error.error.mensaje);
      }
    )
  }
}
