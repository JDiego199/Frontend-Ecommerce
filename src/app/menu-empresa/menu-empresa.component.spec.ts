import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEmpresaComponent } from './menu-empresa.component';

describe('MenuEmpresaComponent', () => {
  let component: MenuEmpresaComponent;
  let fixture: ComponentFixture<MenuEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
