import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  scrollUp(event): void {
    event.preventDefault();
    
    let getElem: any = document.querySelector('body');
    let elemPosition: number;
    let step: number;

    let runScrolling: any = setInterval(() => {
      elemPosition = getElem.offsetTop;
      //top position of element relative to the viewport
      step = Math.round(getElem.getBoundingClientRect().top);

      if (step >= -2 && step <= 2) {
        //scroll to element by its coordinates
        window.scrollTo(0, elemPosition);
        clearInterval(runScrolling);
      } else {
        scrollBy(0, step/20);
        this.scrollUp;
      }
    }, 10);
  }

  constructor() {
   }

  ngOnInit() {
  }

}
