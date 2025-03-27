import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamokgotsoaComponent } from './ramokgotsoa.component';

describe('RamokgotsoaComponent', () => {
  let component: RamokgotsoaComponent;
  let fixture: ComponentFixture<RamokgotsoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RamokgotsoaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RamokgotsoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
