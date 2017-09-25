import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Messages } from '../../models/messages.model';
import { ContactServiceService } from '../../core/contact-service/contact-service.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  @ViewChild('f') sendMesForm: NgForm;
  contactImg: string;
  
  constructor() {
    this.contactImg = '../assets/images/lviv-contact.jpg'
   }

   onSubmit() {

    const value = this.sendMesForm.value;
    // let messages: Messages = {
    //   author: value.name,
    //   email: value.email,
    //   subject: value.subject,
    //   text: value.message,
    //   new: true
    // }
     
    this.sendMesForm.reset();
  }

  ngOnInit() {
  }

}
