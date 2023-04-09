import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardingPageComponent } from './boarding-page.component';

describe('BoardingPageComponent', () => {
  let component: BoardingPageComponent;
  let fixture: ComponentFixture<BoardingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
