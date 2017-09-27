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
  
  constructor(private emailData: ContactServiceService) {
    this.contactImg = '../assets/images/lviv-contact.jpg'
   }

   onSubmit() {
    const value = this.sendMesForm.value;
    let message: Messages = {
      author: value.name,
      email: value.email,
      subject: value.subject,
      text: value.message,
      new: true
    }

    this.emailData.postMessage(message).subscribe(
      (response) => {
        console.log(response);
      }
    );
     
    this.sendMesForm.reset();
  }

  ngOnInit() {
  }

}
