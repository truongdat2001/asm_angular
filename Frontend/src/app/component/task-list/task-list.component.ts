import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../interface/task';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';
import { DulieuService } from '../../dulieu.service';
import { RouterModule } from '@angular/router';
import { Duan } from '../../interface/duan';
import { Nhanvien } from '../../interface/nhanvien';
import { error } from 'node:console';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FontAwesomeModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  trang_thai: number = 0;
  ten_du_an: string = '';
  faTrash = faTrash;
  faWrench = faWrench;
  list_task: Task[] = [];
  list_duan: Duan[] = [];
  list_nhanvien: Nhanvien[] = [];
  showPopup: boolean = false;
  thongbao: string = '';

  constructor(private http: DulieuService) {}

  ngOnInit(): void {
    // this.fetchTasks();
    this.loadAllTask();
    this.loadAllDuAn();
    this.loadAllNhanVien();
  }

  loadAllTask() {
    this.http.getAllTask().subscribe((data: Task[]) => {
      // console.log(data);
      this.list_task = data;
    });
  }

  loadAllDuAn() {
    this.http.getAllDuAn().subscribe((data: Duan[]) => {
      // console.log(data);
      this.list_duan = data;
    });
  }

  loadAllNhanVien() {
    this.http.getAllNhanVien().subscribe((data) => {
      this.list_nhanvien = data;
    });
  }

  xoaTask(id: any) {
    this.http.deleteTask(id).subscribe(
      (data) => {
        console.log('Task đã được xóa', data);
        this.list_task = this.list_task.filter((task) => task.id !== id);
        this.thongbao = data.body.thongbao;
        this.showPopup = true;
        setTimeout(() => {
          this.showPopup = false;
        }, 4000);
      },
      (error) => {
        console.log('Lỗi khi xóa task', error);
        this.thongbao = error.error.thongbao;
      }
    );
  }
}
