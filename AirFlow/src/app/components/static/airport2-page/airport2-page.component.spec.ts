import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Airport2PageComponent } from './airport2-page.component';

describe('Airport2PageComponent', () => {
  let component: Airport2PageComponent;
  let fixture: ComponentFixture<Airport2PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Airport2PageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Airport2PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
