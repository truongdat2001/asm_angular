import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
import { Duan } from '../../interface/duan';

@Component({
  selector: 'app-duan-sua',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './duan-sua.component.html',
  styleUrl: './duan-sua.component.css',
})
export class DuanSuaComponent {
  id: number = 0;
  showPopup: boolean = false;
  data: Duan = <Duan>{};
  listNhanVien: Nhanvien[] = [];
  thongbao: string = '';

  constructor(
    private d: DulieuService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.d.getAllNhanVien().subscribe((data) => {
      this.listNhanVien = data as Nhanvien[];
    });
    this.d.getOneDuAn(this.id).subscribe((duan: any) => {
      console.log(duan);
      this.data = duan[0] as Duan;
    });
  }
  xuly() {
    this.d.putDuAn(this.data).subscribe(
      (response) => {
        console.log('response', response);
        this.showPopup = true;
        this.thongbao = response.body.thongbao;
        setTimeout(() => {
          this.showPopup = false;
          this.router.navigate(['/du-an']);
        }, 4000);
      },
      (error) => {
        console.log('error', error);
        this.thongbao = error.error.thongbao;
      }
    );
  }
}
