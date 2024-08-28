import { Component, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faHouse,
  faMugHot,
  faSort,
  faUser,
  faGhost,
  faCaretDown,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from './component/header/header.component';
import { MenuComponent } from './component/menu/menu.component';
import { CommonModule } from '@angular/common';
import { DangnhapComponent } from './component/dangnhap/dangnhap.component';
import { DangkyComponent } from './component/dangky/dangky.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    RouterLink,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    MenuComponent,
    CommonModule,
    DangnhapComponent,
    DangkyComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isLoggedIn: boolean = true;
  title = 'Front-end';
  faBars = faBars;
  faHouse = faHouse;
  faMugHot = faMugHot;
  faSort = faSort;
  faUser = faUser;
  faGhost = faGhost;
  faCaretDown = faCaretDown;
  faArrowRightFromBracket = faArrowRightFromBracket;
}
