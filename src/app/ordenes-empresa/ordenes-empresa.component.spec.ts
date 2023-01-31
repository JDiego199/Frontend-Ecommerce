import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesEmpresaComponent } from './ordenes-empresa.component';

describe('OrdenesEmpresaComponent', () => {
  let component: OrdenesEmpresaComponent;
  let fixture: ComponentFixture<OrdenesEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenesEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenesEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
