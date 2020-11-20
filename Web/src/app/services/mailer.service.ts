import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Email} from '../Models/Email';

@Injectable({
  providedIn: 'root'
})
export class MailerService {

  url = environment.url + 'mail/';

  constructor(private http: HttpClient) {
  }

  forgotPassword(mail: Email) {
    return this.http.post(this.url + 'recuperarPassword', mail);
  }


  emailTemplate(mail: Email, titulo?: string) {
    return `<table width="100%" height="100%" style="min-width:348px; padding-left: 450px"  border="0" cellspacing="0" cellpadding="0" lang="en">
  <tbody>
  <tr height="32" style="height:32px">
    <td></td>
  </tr>
  <tr align="center">
    <td>
      <div>
        <div></div>
      </div>
      <table border="0" cellspacing="0" cellpadding="0" style="padding-bottom:20px;max-width:516px;min-width:220px">
        <tbody>
        <tr>
          <td width="8" style="width:8px"></td>
          <td>
            <div style="border-style:solid;border-width:thin;border-color:#dadce0;border-radius:8px;padding:40px 20px"
                 align="center" class="m_9095588807060040885mdv2rw">
              <div
                style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;border-bottom:thin solid #dadce0;color:rgba(0,0,0,0.87);line-height:32px;padding-bottom:24px;text-align:center;word-break:break-word">
                <div style="font-size:24px"> ${titulo} &nbsp;</div>
                <table align="center" style="margin-top:8px">
                  <tbody>
                  <tr style="line-height:normal">
                    <td><a
                      style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.87);font-size:14px;line-height:20px">${mail.emails}</a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div
                style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:center">
                ${mail.body}. <br>
                Te hemos enviado este correo electrónico para comprobar que eres tú.

              </div>

            </div>
          </td>
          <td width="8" style="width:8px"></td>
        </tr>
        </tbody>
      </table>
    </td>
  </tr>
  <tr height="32" style="height:32px">
    <td></td>
  </tr>
  </tbody>
</table>
`;

  }

}
