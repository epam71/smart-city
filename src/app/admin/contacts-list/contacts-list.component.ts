import { Component, OnInit } from '@angular/core';
import { ContactServiceService } from '../../core/contact-service/contact-service.service';
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

  showAll() {
    this.fullList = true;
  }

  showNew () {
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

  deleteMessage(id) {
    this.messageData.deleteMessage(id).subscribe();
    setTimeout(() => {
      this.messages = this.messageData.getMessages()
    }, 100);
  }

  sendMessage(form: NgForm) {
    const value = form.value;
    let reply: any = {
      email: value.email,
      subject: value.subject,
      text: value.body
    }

    // this.messageData.putMessage(this.messageId.id, email)
    //   .subscribe(
    //   () => {
    //     this.router.navigate(['/admin/messages/']);
    //   });
    form.controls['subject'].reset();
    form.controls['body'].reset();
  }

  constructor(private messageData: ContactServiceService,
    private router: Router) { }

  ngOnInit() {
        //   this.messageData.getMessage(this.messageId.id).subscribe((response)=>{this.messages = response},
        // (error)=>{console.log(error)
        // });

      this.messageData.getMessages().subscribe((response)=>{this.messages = response},
        (error)=>{console.log(error)
        });
  }

}
