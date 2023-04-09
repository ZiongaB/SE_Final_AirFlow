import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistPageComponent } from './checklist-page.component';

describe('ChecklistPageComponent', () => {
  let component: ChecklistPageComponent;
  let fixture: ComponentFixture<ChecklistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChecklistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
