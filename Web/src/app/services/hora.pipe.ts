import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hora'
})
export class HoraPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {

    if(value){
      const hora = value.split(':');
      return hora[0] + ':' + hora[1];
    }
    return null

  }

}
