import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Location3PageComponent } from './location3-page.component';

describe('Location3PageComponent', () => {
  let component: Location3PageComponent;
  let fixture: ComponentFixture<Location3PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Location3PageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Location3PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
