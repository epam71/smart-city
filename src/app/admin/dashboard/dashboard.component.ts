import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../models/project.model';
import { News } from '../../models/news.model';
import { ProjectServiceService } from "../../core/project-service/project-service.service";
import { AuthService } from "../../core/auth-service/auth-service.service";
import { NewsServiceService } from "../../core/news-service/news-service.service";
import { ContactServiceService } from "../../core/contact-service/contact-service.service";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private projects: number;
  private totalNews: number;
  private today = Date.now();
  private messages: number;
  private users: number;

  constructor(private projectsData: ProjectServiceService,
    private newsData: NewsServiceService,
    private messageData: ContactServiceService,
    private userData: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.projectsData.getProjectsNumber().subscribe(
      (response) => {
        this.projects = response.count;
      },
      (error) => {
        console.log(error)
      });

    this.newsData.getNewsNumber().subscribe(
      (response) => {
        this.totalNews = response.count;
      },
      (error) => {
        console.log(error)
      });

    this.messageData.getMessagesNumber().subscribe(
      (response) => {
        this.messages = response.count;
      },
      (error) => {
        console.log(error)
      });

    this.userData.getUserCount().subscribe(
      (response) => {
        this.users = response.usersCount;
      },
      (error) => {
        console.log(error)
      });
  }
}
