import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from "../core/auth-service/auth-service.service";


@Pipe({
    name: 'filterUserProjects'
})
export class FilterUser implements PipeTransform {

    constructor(private authService: AuthService) { }


    transform(value: any): any {
        let resultArr = [];
        console.log(this.authService.getNickname() + 'USEEER');
        if (value != null) {
            for (let key of value) {
                if (this.authService.getNickname() === key.author) {
                    resultArr.push(key);
                }
            }

            console.log(resultArr);
            return resultArr;

        }

    }

}
