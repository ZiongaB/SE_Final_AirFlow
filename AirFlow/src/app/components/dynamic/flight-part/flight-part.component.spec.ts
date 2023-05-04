import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightPartComponent } from './flight-part.component';

describe('FlightPartComponent', () => {
  let component: FlightPartComponent;
  let fixture: ComponentFixture<FlightPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
