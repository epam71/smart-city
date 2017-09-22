import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageStatus'
})
export class MessageStatusPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (value != null) {
      let viewAll = args;  
      if (viewAll) {
        return value;
      }
      else if (!viewAll) {
        return value.filter(key => {
          return key.new === true;
        });
      }
    }
  }
}
