import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { DuanListComponent } from './component/duan-list/duan-list.component';
import { DuanThemComponent } from './component/duan-them/duan-them.component';
import { DuanSuaComponent } from './component/duan-sua/duan-sua.component';
import { NhanvienListComponent } from './component/nhanvien-list/nhanvien-list.component';
import { NhanvienSuaComponent } from './component/nhanvien-sua/nhanvien-sua.component';
import { TaskListComponent } from './component/task-list/task-list.component';
import { TaskThemComponent } from './component/task-them/task-them.component';
import { TaskSuaComponent } from './component/task-sua/task-sua.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { DangnhapComponent } from './component/dangnhap/dangnhap.component';
import { DangkyComponent } from './component/dangky/dangky.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Trang chủ' },
  { path: 'du-an', component: DuanListComponent, title: 'Danh sách dự án' },
  { path: 'du-an/them', component: DuanThemComponent, title: 'Thêm dự án' },
  { path: 'du-an/sua/:id', component: DuanSuaComponent, title: 'Sửa dự án' },
  {
    path: 'nhan-vien',
    component: NhanvienListComponent,
    title: 'List nhân viên',
  },
  {
    path: 'dang-nhap',
    component: DangnhapComponent,
    title: 'Đăng nhập',
  },
  {
    path: 'dang-ky',
    component: DangkyComponent,
    title: 'Đăng ký',
  },
  {
    path: 'nhan-vien/sua/:id',
    component: NhanvienSuaComponent,
    title: 'Sửa nhân viên',
  },
  { path: 'task', component: TaskListComponent, title: 'List task' },
  { path: 'task/them', component: TaskThemComponent, title: 'Thêm task' },
  { path: 'task/sua/:id', component: TaskSuaComponent, title: 'Sửa task' },
  { path: '**', component: NotFoundComponent, title: 'Không tìm thấy' },
];
