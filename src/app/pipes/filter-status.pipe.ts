import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStatus'
})
export class FilterStatusPipe implements PipeTransform {

  transform(value: any, args: any): any {
  
      if (value != null) {
        let status = args;
      return value.filter(key => {
        return key.status === status;
      });
    }
  }
}
