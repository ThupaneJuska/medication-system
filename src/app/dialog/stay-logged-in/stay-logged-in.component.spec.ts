import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StayLoggedInComponent } from './stay-logged-in.component';

describe('StayLoggedInComponent', () => {
  let component: StayLoggedInComponent;
  let fixture: ComponentFixture<StayLoggedInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StayLoggedInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StayLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
