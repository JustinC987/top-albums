import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandHomeComponent } from './band-home.component';

describe('BandHomeComponent', () => {
  let component: BandHomeComponent;
  let fixture: ComponentFixture<BandHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
