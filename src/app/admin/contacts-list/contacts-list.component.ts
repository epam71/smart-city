import { Component, OnInit } from '@angular/core';
import { ContactServiceService } from '../../core/contact-service/contact-service.service';
import { EmailServiceService } from '../../core/email-service/email-service.service';
import { Router } from '@angular/router';
import { Messages } from '../../models/messages.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../core/auth-service/auth-service.service';
import { Reply } from '../../models/reply.model';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  public messages;
  public message;
  private wasNotClicked: any;
  private fullList = false;
  public messageId;
  private myParam = 'body';

  showAll() {
    this.fullList = true;
  }

  showNew() {
    this.fullList = false;
  }

  onClick(newValue: number) {
    if (this.wasNotClicked === newValue) {
      this.wasNotClicked = false;
    }
    else {
      this.wasNotClicked = newValue;
    }
  }

  chooseMes(key) {
    this.message = key;
  }

  deleteMessage() {
    let changed = this.messageData.deleteMessage(this.message._id);
    let refresh = changed.switchMap(param => {
      return this.messageData.getMessages();
    });
    refresh.subscribe(
      (response) => {
        this.messages = response;
      });
  }

  sendMessage(form: NgForm) {
    const value = form.value;
    let reply: Reply = {
      email: value.email,
      subject: value.subject,
      html: value.body,
      text: value.body
    }

    this.emailData.postEmail(reply)
      .subscribe(
      (response) => {
        this.router.navigate(['/admin/contacts/']);
      });
    form.controls['subject'].reset();
    form.controls['body'].reset();

    let changes = this.messageData.putMessage(this.message._id, { "new": false });
    let refresh = changes.switchMap(param => {
      return this.messageData.getMessages();
    });
    refresh.subscribe(
      (response) => {
        this.messages = response;
      });
  }

  constructor(private messageData: ContactServiceService,
    private emailData: EmailServiceService,
    private router: Router) { }

  ngOnInit() {
    this.messageData.getMessages().subscribe(
      (response) => {
        this.messages = response
      },
      (error) => {
        console.log(error)
      });
  }

}
