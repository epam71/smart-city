import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsAddComponent } from './news-add.component';

describe('NewsComponent', () => {
  let component: NewsAddComponent;
  let fixture: ComponentFixture<NewsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
