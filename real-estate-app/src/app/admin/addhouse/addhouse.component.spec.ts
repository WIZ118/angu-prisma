import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhouseComponent } from './addhouse.component';

describe('AddhouseComponent', () => {
  let component: AddhouseComponent;
  let fixture: ComponentFixture<AddhouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddhouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddhouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
