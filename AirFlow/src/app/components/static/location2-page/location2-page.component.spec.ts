import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Location2PageComponent } from './location2-page.component';

describe('Location2PageComponent', () => {
  let component: Location2PageComponent;
  let fixture: ComponentFixture<Location2PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Location2PageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Location2PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
