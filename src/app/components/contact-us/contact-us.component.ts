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
  formPopup: boolean;
  public responseMes: string;
  constructor(private emailData: ContactServiceService) {
    this.contactImg = '../assets/images/lviv-contact.jpg'
   }

   onSubmit() {
    const value = this.sendMesForm.value;
    this.formPopup = true;
    setTimeout(() => { this.formPopup = false}, 3000);
    let messages: Messages = {
      author: value.name,
      email: value.email,
      subject: value.subject,
      body: value.message,
      new: true
    }


    this.emailData.postMessage(messages).subscribe(
      response => this.responseMes = 'Your message has been sent!',
      error => this.responseMes = "Error :: Please log in to send a message!"
    );
     
    this.sendMesForm.reset();
  }

  ngOnInit() {
  }

}
