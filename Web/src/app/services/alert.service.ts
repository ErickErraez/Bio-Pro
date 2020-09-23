import {Injectable} from '@angular/core';

declare var $: any;


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() {
  }

  showNotification(tipo, icono, mensaje) {
    const type = ['info', 'success', 'warning', 'danger'];

    $.notify({
      icon: icono,
      message: mensaje
    }, {
      type: tipo,
      timer: 1000,
      placement: {
        from: 'top',
        align: 'right'
      }
    });
  }
}
