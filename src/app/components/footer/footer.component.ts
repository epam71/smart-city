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

    let getHref: string = event.currentTarget.attributes.href.value;
    let getElem: any = document.querySelector(getHref);
    let elemPosition: number;
    let positionTop: number;
    let step: number;

    let runScrolling: any = setInterval(() => {
      elemPosition = getElem.offsetTop;
      positionTop = window.pageYOffset;

      if (step >= -2 && step <= 2) {
        window.scrollTo(0, elemPosition);
        clearInterval(runScrolling);
      } else {
        scrollBy(0, step/10);
        step = Math.round(getElem.getBoundingClientRect().top);
        this.scrollUp;
      }
    }, 7);
  }
  constructor() {
   }

  ngOnInit() {
  }

}
