import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Duan } from '../../interface/duan';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { Nhanvien } from '../../interface/nhanvien';
import { DulieuService } from '../../dulieu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-duan-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './duan-list.component.html',
  styleUrls: ['./duan-list.component.css'],
})
export class DuanListComponent implements OnInit {
  showPopup: boolean = false;
  thongbao: string = '';
  faWrench = faWrench;
  faTrash = faTrash;
  list_duan: Duan[] = [];
  list_nhanvien: Nhanvien[] = [];

  constructor(private http: DulieuService, private router: Router) {}

  ngOnInit(): void {
    this.loadDuAn();
  }

  loadDuAn(): void {
    this.http.getAllDuAn().subscribe((data: Duan[]) => {
      this.list_duan = data;
    });
  }

  xoaDuAn(id: any) {
    this.http.deleteDuAn(id).subscribe(
      (data) => {
        console.log('Dự án đã được xóa', data);
        this.thongbao = data.body.thongbao;
        // Cập nhật bảng để loại bỏ hàng có id đã xóa
        this.list_duan = this.list_duan.filter((duan) => duan.id !== id);
        this.showPopup = true;
        setTimeout(() => {
          this.showPopup = false;
        }, 4000);
      },
      (error) => {
        console.log('Lỗi khi xóa dự án', error);
        this.thongbao = error.error.thongbao;
      }
    );
  }
}
