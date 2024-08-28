import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DulieuService } from '../../dulieu.service';
import { Nhanvien } from '../../interface/nhanvien';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-dangky',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dangky.component.html',
  styleUrl: './dangky.component.css',
})
export class DangkyComponent {
  showPopup: boolean = false;
  thongbao: string = '';
  nhan_vien: Nhanvien[] = [];
  formDangKy: FormGroup = new FormGroup({
    hovaten: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(32),
    ]),
    email: new FormControl('', Validators.required),
    mat_khau: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    ngay_sinh: new FormControl('', Validators.required),
    gioi_tinh: new FormControl('', Validators.required),
    khu_vuc: new FormControl('', Validators.required),
  });

  constructor(private http: DulieuService, private router: Router) {}

  dangKy(nv: any) {
    this.http.postNhanVien(nv).subscribe(
      (data) => {
        console.log(data);
        this.thongbao = data.body.thongbao;
        this.showPopup = true;
        setTimeout(() => {
          this.showPopup = false;
          this.router.navigate(['/dang-nhap']);
        }, 4000);
      },
      (error) => {
        console.log('error', error);
        this.thongbao = error.error.thongbao;
      }
    );
  }
}
