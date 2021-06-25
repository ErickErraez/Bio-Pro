import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) {
      return value;
    }
    const resultado = [];
    for (const post of value) {
      if (post.nombre.indexOf(arg.toUpperCase()) > -1) {
        resultado.push(post);
      }
    }
    return resultado;
  }
}
