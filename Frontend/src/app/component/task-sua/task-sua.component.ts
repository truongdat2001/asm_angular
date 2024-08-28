import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Task } from '../../interface/task';
import { Nhanvien } from '../../interface/nhanvien';
import { DulieuService } from '../../dulieu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Duan } from '../../interface/duan';
import { response } from 'express';

@Component({
  selector: 'app-task-sua',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './task-sua.component.html',
  styleUrl: './task-sua.component.css',
})
export class TaskSuaComponent {
  // checked: boolean = true;
  id: number = 0;
  showPopup: boolean = false;
  oneTask: Task = <Task>{};
  listNhanVien: Nhanvien[] = [];
  listDuAn: Duan[] = [];
  thongbao: string = '';
  formSuaTask: FormGroup = new FormGroup({
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

  constructor(
    private http: DulieuService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.getAllDuAn().subscribe((data) => {
      this.listDuAn = data as Duan[];
    });
    this.http.getAllNhanVien().subscribe((data) => {
      this.listNhanVien = data as Nhanvien[];
    });
    this.http.getOneTask(this.id).subscribe((task: any) => {
      // console.log(task);
      this.oneTask = task[0] as Task;
    });
  }

  xuly() {
    this.http.putTask(this.oneTask).subscribe(
      (response) => {
        // console.log('response', response);
        this.showPopup = true;
        this.thongbao = response.body.thongbao;
        setTimeout(() => {
          this.showPopup = false;
          this.router.navigate(['/task']);
        }, 4000);
      },
      (error) => {
        console.log('error', error);
        this.thongbao = error.error.thongbao;
      }
    );
  }
}
