import {Component, OnInit} from '@angular/core';
import {MailerService} from '../services/mailer.service';
import {Email} from '../Models/Email';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {

  email: Email = new Email();

  constructor(private mail: MailerService) {
  }

  ngOnInit(): void {
    this.email.asunto = 'Recuperacion de Contraseña';
    this.email.body = 'SU NUEVA CLAVE ES: ' + 123;
  }

  enviar() {
    this.email.body = this.mail.emailTemplate(this.email, 'Recuperacion de cuenta');
    this.mail.forgotPassword(this.email).subscribe(res => {
      this.email = new Email();
    });
  }


}
