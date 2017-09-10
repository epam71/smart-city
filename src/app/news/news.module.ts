import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsComponent } from './news/news.component';
import { routing } from './news.routes';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [NewsListComponent, NewsComponent]
})
export class NewsModule { }
