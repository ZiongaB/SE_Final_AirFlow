import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Airport1PageComponent } from './airport1-page.component';

describe('Airport1PageComponent', () => {
  let component: Airport1PageComponent;
  let fixture: ComponentFixture<Airport1PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Airport1PageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Airport1PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
