import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from "../core/auth-service/auth-service.service";


@Pipe({
    name: 'sortBy'
})
export class SortBy implements PipeTransform {

    transform(data: any, value: any, reverse: boolean): any {

        if (data != null) {
            if (value === 'all') {
                return data;
            } else {
                
                data = data.sort((item1, item2) => {

                    if (value === 'projectName'){
                        item1[value] = item1[value].toUpperCase();
                        item2[value] = item2[value].toUpperCase();
                    }

                    if (item1[value] < item2[value]) {
                        return -1;
                    }
                    if (item1[value] > item2[value]) {
                        return 1;
                    }
                    return 0;
                });

                if (reverse === true) {
                    return data.reverse();
                }
                return data;

            }
        }
    }

}
