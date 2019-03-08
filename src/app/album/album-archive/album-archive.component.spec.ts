import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumArchiveComponent } from './album-archive.component';

describe('AlbumArchiveComponent', () => {
  let component: AlbumArchiveComponent;
  let fixture: ComponentFixture<AlbumArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
