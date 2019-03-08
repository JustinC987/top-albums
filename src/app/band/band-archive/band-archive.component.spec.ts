import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandArchiveComponent } from './band-archive.component';

describe('BandArchiveComponent', () => {
  let component: BandArchiveComponent;
  let fixture: ComponentFixture<BandArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
