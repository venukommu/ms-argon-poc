import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctoractivitiesComponent } from './doctoractivities.component';

describe('DoctoractivitiesComponent', () => {
  let component: DoctoractivitiesComponent;
  let fixture: ComponentFixture<DoctoractivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctoractivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctoractivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
