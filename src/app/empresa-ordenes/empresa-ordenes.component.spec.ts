import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaOrdenesComponent } from './empresa-ordenes.component';

describe('EmpresaOrdenesComponent', () => {
  let component: EmpresaOrdenesComponent;
  let fixture: ComponentFixture<EmpresaOrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaOrdenesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
