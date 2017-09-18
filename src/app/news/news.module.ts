import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsAddComponent } from './news-add/news-add.component';
import { NewsComponent } from './news/news.component';
import { routing } from './news.routes';
import { TruncatePipe } from '../pipes/truncate-news.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { searchNews } from '../pipes/search-news.pipe';
import { sortingNews } from '../pipes/sort-news.pipe';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [NewsListComponent, 
    NewsComponent, 
    NewsAddComponent, 
    TruncatePipe,
    searchNews,
    sortingNews
  ]
})
export class NewsModule { }
