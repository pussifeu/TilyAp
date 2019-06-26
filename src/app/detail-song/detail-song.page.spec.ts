import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSongPage } from './detail-song.page';

describe('DetailSongPage', () => {
  let component: DetailSongPage;
  let fixture: ComponentFixture<DetailSongPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSongPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
