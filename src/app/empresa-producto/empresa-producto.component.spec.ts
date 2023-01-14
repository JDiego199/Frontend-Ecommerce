import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaProductoComponent } from './empresa-producto.component';

describe('EmpresaProductoComponent', () => {
  let component: EmpresaProductoComponent;
  let fixture: ComponentFixture<EmpresaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
