import { AuthService } from '../../core/auth-service/auth-service.service';

export class Project {

    constructor(
        public author: string,
        public projectName: string,
        public image: string,
        public desc: any,
        public goals: string,
        public result: string,
        public budget: number,
        public date: any = new Date(),
        public rating: number = 0, public type: boolean = true,
        public approved: boolean = false,
        public done: boolean = false,
        public status: string = 'new') { }
}