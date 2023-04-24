import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsPartComponent } from './trips-part.component';

describe('TripsPartComponent', () => {
  let component: TripsPartComponent;
  let fixture: ComponentFixture<TripsPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripsPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripsPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
