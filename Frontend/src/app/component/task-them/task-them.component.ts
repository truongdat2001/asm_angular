import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DulieuService } from '../../dulieu.service';
import { Task } from '../../interface/task';
import { Nhanvien } from '../../interface/nhanvien';
import { Duan } from '../../interface/duan';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-them',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-them.component.html',
  styleUrl: './task-them.component.css',
})
export class TaskThemComponent implements OnInit {
  listDuAn: Duan[] = [];
  showPopup: boolean = false;
  listNhanVien: Nhanvien[] = [];

  thongbao: string = '';
  formAddTask: FormGroup = new FormGroup({
    ten_task: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(32),
    ]),
    mo_ta: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(500),
    ]),
    du_an_id: new FormControl('', Validators.required),
    nhan_vien_id: new FormControl('', Validators.required),
    trang_thai: new FormControl('', Validators.required),
  });

  constructor(private http: DulieuService, private router: Router) { }
  ngOnInit(): void {
    this.http.getAllNhanVien().subscribe((data) => {
      this.listNhanVien = data as Nhanvien[];
    });
    this.http.getAllDuAn().subscribe((data) => {
      this.listDuAn = data as Duan[];
    });
  }


  xuly(task: Task) {
    this.http.postTask(task).subscribe(
      (data) => {
        console.log(data);
        this.showPopup = true;
        this.thongbao = data.body.thongbao;
        setTimeout(() => {
          this.showPopup = false;
          this.router.navigate(['/task']);
        }, 4000);
      },
      (error) => {
        console.log(task, error);
      }
    );
  }
}
