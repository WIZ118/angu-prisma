import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHousesComponent } from './manage-houses.component';

describe('ManageHousesComponent', () => {
  let component: ManageHousesComponent;
  let fixture: ComponentFixture<ManageHousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageHousesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
