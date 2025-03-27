import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaukeComponent } from './chauke.component';

describe('ChaukeComponent', () => {
  let component: ChaukeComponent;
  let fixture: ComponentFixture<ChaukeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChaukeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChaukeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
