import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { NewsServiceService } from '../../core/news-service/news-service.service';
import { AuthService } from "../../core/auth-service/auth-service.service";
import { News } from "../models/news.model";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.css']
})

export class NewsAddComponent implements OnInit {
  rForm: FormGroup;                   
  desc:string = '';
  title:string = '';
  showModal;
 
constructor(private service: NewsServiceService, 
  private router: Router, 
  private authService: AuthService,
  private fb: FormBuilder) { 
    this.rForm = fb.group({
    'title' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
    'desc' : [null, Validators.compose([Validators.required, Validators.minLength(80), Validators.maxLength(1500)])],
    'validate' : ''
    });
  }

  onAddNews( title, image, desc) {
    let newsTemp: News = {  
     author: this.authService.getName(), 
      title: title,
      image: image, 
      desc: desc, 
      date: Date,
      approved: false,
      status: 'new'
    };

    this.service.postNews(newsTemp)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
      
    this.rForm.reset();

    this.showModal = true;
    setTimeout(()=>{    
      this.showModal = false;
    },6000);
  }

  ngOnInit() {}

}