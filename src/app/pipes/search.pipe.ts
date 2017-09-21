import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from "../core/auth-service/auth-service.service";


@Pipe({
    name: 'searchBy'
})

export class SearchBy implements PipeTransform {

    transform(data: any, filterProp, filterValue: any): any {

        if (data != null) {
            if (data.length === 0 || filterValue === '') {
                return data;
            }
            return data.filter((el) => {
                return el[filterProp].toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
            });
            }
        }
    }
