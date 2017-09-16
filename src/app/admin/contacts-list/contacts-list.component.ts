import { Component, OnInit } from '@angular/core';
import { ContactServiceService } from '../../core/contact-service/contact-service.service';
import { Router } from '@angular/router';
import { Messages } from '../../models/messages.model';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  public messages;

  constructor(private messageData: ContactServiceService,
    private router: Router) { }

  ngOnInit() {
    this.messages = this.messageData.getMessages();
  }

}
