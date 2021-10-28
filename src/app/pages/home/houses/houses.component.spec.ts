import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HousesComponent } from './houses.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HousesComponent', () => {
  let component: any;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HousesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
