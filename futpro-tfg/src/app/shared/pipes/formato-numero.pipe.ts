import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatoNumero',
  standalone: true
})
export class FormatoNumeroPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (value === undefined || value === null) {
      return '';
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

}
