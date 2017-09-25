import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLikeComponent } from './news-like.component';

describe('NewsListComponent', () => {
  let component: NewsLikeComponent;
  let fixture: ComponentFixture<NewsLikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsLikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
