import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactImg: string;
  constructor() {
    this.contactImg = '../assets/images/lviv-contact.jpg'
   }

  ngOnInit() {
  }

}
