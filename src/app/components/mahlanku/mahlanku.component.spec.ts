import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MahlankuComponent } from './mahlanku.component';

describe('MahlankuComponent', () => {
  let component: MahlankuComponent;
  let fixture: ComponentFixture<MahlankuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MahlankuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MahlankuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
