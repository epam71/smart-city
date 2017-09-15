import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from "../core/auth-service/auth-service.service";


@Pipe({
    name: 'filterUserProjects'
})
export class FilterUser implements PipeTransform {

    constructor(private authService: AuthService) { }


    transform(value: any, arg): any {

        if (value != null) {
            if (arg === true) {
                let resultArr = [];
                for (let key of value) {
                    if (this.authService.getNickname() === key.author) {
                        resultArr.push(key);
                    }
                }
                return resultArr;
            } else {
                return value;
            }
        }

    }

}
