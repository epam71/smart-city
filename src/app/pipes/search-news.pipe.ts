import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({ 
    name: 'searchNews' 
})

export class searchNews implements PipeTransform {
    transform(value: any, input: any, param: string): any {
        if(input == null) return value;
        return value.filter(function(el){
          return el[param].toLowerCase().indexOf(input.toLowerCase()) > -1;
        })
      }
}

