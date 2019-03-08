import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandModalComponent } from './band-modal.component';

describe('BandModalComponent', () => {
  let component: BandModalComponent;
  let fixture: ComponentFixture<BandModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
