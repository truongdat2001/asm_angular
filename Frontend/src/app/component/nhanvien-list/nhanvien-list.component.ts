import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Nhanvien } from '../../interface/nhanvien';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { DulieuService } from '../../dulieu.service';
import { error } from 'console';

@Component({
  selector: 'app-nhanvien-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './nhanvien-list.component.html',
  styleUrl: './nhanvien-list.component.css',
})
export class NhanvienListComponent implements OnInit {
  faTrash = faTrash;
  id: number = 0;
  thongbao: string = '';
  showPopup: boolean = false;
  faWrench = faWrench;
  list_nv: Nhanvien[] = [];
  constructor(private http: DulieuService) {}
  ngOnInit(): void {
    fetch(`http://localhost:3000/nhan-vien`)
      .then((res) => res.json())
      .then((data) => {
        this.list_nv = data;
        // console.log(this.list_nv);
      });
  }

  xoaNhanVien(id: any) {
    this.http.deleteNhanVien(id).subscribe(
      (data) => {
        console.log('Nhân viên đã được xóa', data);
        this.thongbao = data.body.thongbao;
        this.list_nv = this.list_nv.filter((nv) => nv.id !== id);
        this.showPopup = true;
        setTimeout(() => {
          this.showPopup = false;
        }, 4000);
      },
      (error) => {
        console.log('Lỗi khi xóa nhân viên', error);
        this.thongbao = error.error.thongbao;
      }
    );
  }
}
