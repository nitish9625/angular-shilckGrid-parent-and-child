import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForezeGridComponent } from './foreze-grid.component';

describe('ForezeGridComponent', () => {
  let component: ForezeGridComponent;
  let fixture: ComponentFixture<ForezeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForezeGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForezeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
