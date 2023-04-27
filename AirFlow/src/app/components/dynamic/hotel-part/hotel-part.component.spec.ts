import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelPartComponent } from './hotel-part.component';

describe('HotelPartComponent', () => {
  let component: HotelPartComponent;
  let fixture: ComponentFixture<HotelPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
