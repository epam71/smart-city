export class Project{
    
      constructor(
        public author: string,
        public projectName: string,
        public shortDesc: any, public fullDesc: any, 
        public image: string, public category: any,
        public budget: number = 0, public date: any = new Date(),
        public type: boolean = true,
        public approved: boolean = false,
        public done: boolean = false) {
    
      }
    }

    // export class Project{
      
    //     constructor(
    //       public author: string = 'test', public projectName: string,
    //       public shortDesc: any, public fullDesc: any, 
    //       public image: string, public goals: any, public result: any, public involved: any,
    //                 public type: boolean, 
    //                 public budget: any, public approved: boolean = false) {
      
    //     }
    //   }