import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AproposPage } from './apropos.page';

describe('AproposPage', () => {
  let component: AproposPage;
  let fixture: ComponentFixture<AproposPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AproposPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AproposPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
