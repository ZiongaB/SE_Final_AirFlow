import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Location1PageComponent } from './location1-page.component';

describe('Location1PageComponent', () => {
  let component: Location1PageComponent;
  let fixture: ComponentFixture<Location1PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Location1PageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Location1PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
