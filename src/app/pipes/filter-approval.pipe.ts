import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterApproval'
})
export class FilterApprovalPipe implements PipeTransform {

  transform(value: any, args?: any): any {
  
      if (value != null) {
        let approval = args;
      return value.filter(key => {
        return key.approved === approval;
      });
    }
  }
}
