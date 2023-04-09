import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Airport3PageComponent } from './airport3-page.component';

describe('Airport3PageComponent', () => {
  let component: Airport3PageComponent;
  let fixture: ComponentFixture<Airport3PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Airport3PageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Airport3PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
