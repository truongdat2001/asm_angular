import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Nhanvien } from '../../interface/nhanvien';
import { DulieuService } from '../../dulieu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-nhanvien-sua',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './nhanvien-sua.component.html',
  styleUrl: './nhanvien-sua.component.css',
})
export class NhanvienSuaComponent implements OnInit {
  id: number = 0;
  oneNhanVien: Nhanvien = <Nhanvien>{};
  thongbao: string = '';
  showPopup: boolean = false;
  constructor(
    private http: DulieuService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.getOneNhanVien(this.id).subscribe((data: any) => {
      this.oneNhanVien = data[0] as Nhanvien;
    });
  }

  xuly() {
    this.http.putNhanVien(this.oneNhanVien).subscribe(
      (data) => {
        this.showPopup = true;
        this.thongbao = data.body.thongbao;
        setTimeout(() => {
          this.showPopup = false;
          this.router.navigate(['/nhan-vien']);
        }, 4000);
      },
      (error) => {
        console.log('error', error);
        this.thongbao = error.error.thongbao;
      }
    );
  }
}
