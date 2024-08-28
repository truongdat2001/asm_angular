import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Duan } from './interface/duan';
import { Nhanvien } from './interface/nhanvien';
import { Task } from './interface/task';
import { Dangnhap } from './interface/dangnhap';

@Injectable({
  providedIn: 'root',
})
export class DulieuService {
  constructor(private http: HttpClient) {}

  // DỰ ÁN
  getAllDuAn(): Observable<Duan[]> {
    return this.http.get<Duan[]>(`http://localhost:3000/du-an`);
  }

  getOneDuAn(id: number): Observable<Duan> {
    return this.http.get<Duan>(`http://localhost:3000/du-an/${id}`);
  }

  postDuAn(duan: Duan): Observable<HttpResponse<any>> {
    return this.http.post<any>(`http://localhost:3000/du-an`, duan, {
      observe: 'response',
    });
  }

  deleteDuAn(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`http://localhost:3000/du-an/${id}`, {
      observe: 'response',
    });
  }

  putDuAn(duan: Duan): Observable<HttpResponse<any>> {
    return this.http.put<any>(`http://localhost:3000/du-an/${duan.id}`, duan, {
      observe: 'response',
    });
  }

  // NHÂN VIÊN
  getAllNhanVien(): Observable<Nhanvien[]> {
    return this.http.get<Nhanvien[]>(`http://localhost:3000/nhan-vien`);
  }

  getOneNhanVien(id: number): Observable<Nhanvien> {
    return this.http.get<Nhanvien>(`http://localhost:3000/nhan-vien/${id}`);
  }

  postNhanVien(nhanvien: Nhanvien): Observable<HttpResponse<any>> {
    return this.http.post<any>(`http://localhost:3000/nhan-vien`, nhanvien, {
      observe: 'response',
    });
  }

  deleteNhanVien(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`http://localhost:3000/nhan-vien/${id}`, {
      observe: 'response',
    });
  }

  putNhanVien(nhanvien: Nhanvien): Observable<HttpResponse<any>> {
    return this.http.put<any>(
      `http://localhost:3000/nhan-vien/${nhanvien.id}`,
      nhanvien,
      { observe: 'response' }
    );
  }

  // TASK
  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(`http://localhost:3000/task`);
  }

  getOneTask(id: number): Observable<Task> {
    return this.http.get<Task>(`http://localhost:3000/task/${id}`);
  }

  postTask(task: Task): Observable<HttpResponse<any>> {
    return this.http.post<any>(`http://localhost:3000/task`, task, {
      observe: 'response',
    });
  }

  deleteTask(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`http://localhost:3000/task/${id}`, {
      observe: 'response',
    });
  }

  putTask(task: Task): Observable<HttpResponse<any>> {
    return this.http.put<any>(`http://localhost:3000/task/${task.id}`, task, {
      observe: 'response',
    });
  }

  postDangNhap(dangNhap: any) {
    return this.http.post(`http://localhost:3000/dang-nhap`, dangNhap);
  }
}
