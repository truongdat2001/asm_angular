import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  faBars = faBars;
  faArrowRightFromBracket = faArrowRightFromBracket;
  showavatar: any;
  token: any = 4;
  tokenPayload: any;

  ngOnInit() {
    // this.token = localStorage.getItem("token");
    // if (this.token) {
    //   this.tokenPayload = jwtDecode(this.token);
    //   console.log(this.tokenPayload);
    // }
  }
}
