import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAccesComponent } from './set-acces.component';

describe('SetAccesComponent', () => {
  let component: SetAccesComponent;
  let fixture: ComponentFixture<SetAccesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetAccesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetAccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
