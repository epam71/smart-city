import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsAddComponent } from './news-add/news-add.component';
import { NewsComponent } from './news/news.component';
import { routing } from './news.routes';
import { TruncatePipe } from '../pipes/truncate-news.pipe';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [NewsListComponent, 
    NewsComponent, 
    NewsAddComponent, 
    TruncatePipe
  ]
})
export class NewsModule { }
