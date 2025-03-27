import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EugelterComponent } from './eugelter.component';

describe('EugelterComponent', () => {
  let component: EugelterComponent;
  let fixture: ComponentFixture<EugelterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EugelterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EugelterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
