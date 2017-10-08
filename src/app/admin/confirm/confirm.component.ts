import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  public visible = false;
  public visibleAnimate = false;

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);

    let nonTabs = Array.from(document.querySelectorAll('button.approve, button.close, button.edit, button.delete, input:not([disabled]):not([type="text"]), .more, a, .panel-heading, .drop-down-menu, .card-img-top, .sort-btn, .sort-option, .btn-filter, .media-body, .controls'));
    nonTabs.forEach(function (el) {
      el.setAttribute('tabindex', '-1');
    });
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);

    let nonTabs = Array.from(document.querySelectorAll('button.approve, button.close, button.edit, button.delete, input:not([disabled]):not([type="text"]), .more, a, .panel-heading, .drop-down-menu, .card-img-top, .sort-btn, .sort-option, .btn-filter, .media-body, .controls'));
    nonTabs.forEach(function (el) {
      el.setAttribute('tabindex', '0');
    });
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
