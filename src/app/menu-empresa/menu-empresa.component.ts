import { Component } from '@angular/core';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';


@Component({
  selector: 'app-menu-empresa',
  templateUrl: './menu-empresa.component.html',
  styleUrls: ['./menu-empresa.component.scss']
})
export class MenuEmpresaComponent {
  listOfPosition: NzPlacementType[] = ['bottomRight'];
}

