import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

const MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [...MODULES],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
