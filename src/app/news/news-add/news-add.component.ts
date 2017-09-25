import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { NewsServiceService } from '../../core/news-service/news-service.service';
import { AuthService } from "../../core/auth-service/auth-service.service";
import { News } from "../../models/news.model";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.css']
})

export class NewsAddComponent implements OnInit {
  private rForm: FormGroup;                   
  private desc:string = '';
  private title:string = '';
  private showModal;
  private base64Image: string;
 
constructor(private service: NewsServiceService, 
  private router: Router, 
  private authService: AuthService,
  private fb: FormBuilder) { 
    this.rForm = fb.group({
    'title' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
    'desc' : [null, Validators.compose([Validators.required, Validators.minLength(150), Validators.maxLength(1500)])],
    'validate' : ''
    });
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.base64Image = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  onAddNews( title, desc) {
    let newsTemp: News = {  
     author: this.authService.getNickname(),
      title: title,
      image: this.base64Image, 
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