import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from "../core/auth-service/auth-service.service";


@Pipe({
    name: 'sortBy'
})
export class SortBy implements PipeTransform {

    transform(data: any, value: any, reverse: string): any {

        if (data != null) {
            if (value === 'all') {
                return data;
            } else {
                
                data.sort((item1, item2) => {
                    let a = (value === 'projectName') ? item1[value].toUpperCase() : item1[value];
                    let b = (value === 'projectName') ? item2[value].toUpperCase() : item2[value];

                    if (a < b) {
                        return -1;
                    }
                    if (a > b) {
                        return 1;
                    }
                    return 0;
                });

                if (reverse === 'reverse') {
                    return data.reverse();
                }
                return data;

            }
        }
    }

}
