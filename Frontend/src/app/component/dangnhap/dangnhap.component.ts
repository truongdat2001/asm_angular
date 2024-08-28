import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterModule } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { DulieuService } from '../../dulieu.service';
import { Nhanvien } from '../../interface/nhanvien';
import { error } from 'console';

@Component({
  selector: 'app-dangnhap',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dangnhap.component.html',
  styleUrl: './dangnhap.component.css',
})
export class DangnhapComponent {
  showPopup: boolean = false;
  thongbao: string = '';
  nhan_vien: Nhanvien[] = [];
  formDangNhap: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    mat_khau: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  // console.log(this.thongbao);


  constructor(private http: DulieuService, private router: Router) { }

  dangNhap(nv: any) {
    this.http.postDangNhap(nv).subscribe((data: any) => {
      // localStorage.setItem('token', data.accesToken);
      this.showPopup = true
      setTimeout(() => {
        this.showPopup = false
        this.router.navigate(['/'])
      }, 4000)
    },
      (error) => {
        this.thongbao = error.error.thongbao
      })
  }

}
