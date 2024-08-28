import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DulieuService } from '../../dulieu.service';
import { Nhanvien } from '../../interface/nhanvien';
import { Duan } from '../../interface/duan';
import { error } from 'console';

@Component({
  selector: 'app-duan-them',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './duan-them.component.html',
  styleUrl: './duan-them.component.css',
})
export class DuanThemComponent {
  listNhanvien: Nhanvien[] = [];
  leaders: Nhanvien[] = [];
  showPopup = false;
  thongbao: string = '';

  formAddDuAn: FormGroup = new FormGroup({
    ten_du_an: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(62),
    ]),
    ngay_bat_dau: new FormControl('', Validators.required),
    tien: new FormControl('', Validators.required),
    leader: new FormControl('', Validators.required), // Thêm form control cho leader
    thanh_vien: new FormControl([], Validators.required), // Thêm form control cho thanh_vien
  });

  constructor(private d: DulieuService, private router: Router) { }
  ngOnInit(): void {
    this.d.getAllNhanVien().subscribe((data) => {
      this.listNhanvien = data as Nhanvien[];
    });
  }

  xuly(duan: Duan) {
    // Kiểm tra dữ liệu trước khi gửi
    if (this.formAddDuAn.invalid) {
      this.thongbao = 'Dữ liệu không hợp lệ, vui lòng kiểm tra lại.';
      return;
    }

    // Gửi yêu cầu lên server
    this.d.postDuAn(duan).subscribe(
      (data) => {
        console.log(duan, data);
        this.showPopup = true;
        this.thongbao = data.body.thongbao;
        setTimeout(() => {
          this.showPopup = false;
          this.router.navigate(['/du-an']);
        }, 4000);
      },
      (error) => {
        console.log(duan);
        console.log('error', error);
        // this.thongbao =
        //   error.error?.thongbao || 'Có lỗi xảy ra. Vui lòng thử lại.';
      }
    );
  }
}
