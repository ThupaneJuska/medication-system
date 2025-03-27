import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdauComponent } from './mdau.component';

describe('MdauComponent', () => {
  let component: MdauComponent;
  let fixture: ComponentFixture<MdauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
