import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newLine'
})
export class NewLinePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value = value.replace(/(?:\r\n\r\n|\r\r|\n\n)/g, '</p><p>');
    return '<p>' + value.replace(/(?:\r\n|\r|\n)/g, '<br>') + '</p>';
  }

}
