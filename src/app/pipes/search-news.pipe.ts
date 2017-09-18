import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({ 
    name: 'searchNews' 
})

export class searchNews implements PipeTransform {
    transform(value: any, input: any): any {
        if(input == null) return value;
    
        return value.filter(function(el){
          return el.title.toLowerCase().indexOf(input.toLowerCase()) > -1;
        })
      }
}

