import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackinglistPartComponent } from './packinglist-part.component';

describe('PackinglistPartComponent', () => {
  let component: PackinglistPartComponent;
  let fixture: ComponentFixture<PackinglistPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackinglistPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackinglistPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
