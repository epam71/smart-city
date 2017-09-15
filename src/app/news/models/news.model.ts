// export class News{

//     public title: string;
//     public author: string;
//     public image: string;
//     public desc: any;

//       constructor(title, author, image, desc){
//         this.title= title,
//         this.author= author, 
//         this.image= image,
//         this.desc= desc
   
//       }
//     }

    export class News{
      
        constructor(
          public author: string,
          public title: string,
          public image: string,
          public desc: any,
          public date: any = new Date(),
          public approved: boolean = false) {
      
        }
      }