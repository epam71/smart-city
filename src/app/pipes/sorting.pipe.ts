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

                    if (item1[value] < item2[value]) {
                        return -1;
                    }
                    if (item1[value] > item2[value]) {
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
