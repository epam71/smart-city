import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatWeBuildComponent } from './what-we-build.component';

describe('WhatWeBuildComponent', () => {
  let component: WhatWeBuildComponent;
  let fixture: ComponentFixture<WhatWeBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatWeBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatWeBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
