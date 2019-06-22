import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkordersService {
  constructor(private http: HttpClient) {}

  getWorkorders(woPerPage?: number, currentPage?: number) {
    const queryParams = `?pagesize=${woPerPage}&page=${currentPage}`;
    return this.http.get<{ message: string; workorders: any; count: any }>(
      environment.apiUrl + '/workorders' + queryParams
    );
  }
  createWorkorder(building, apartment, user) {
    const data = {
      building: building,
      apartment: apartment,
      userId: user._id
    };
    return this.http.post<{ message: string; workorder: any }>(
      environment.apiUrl + '/workorderStartInfo',
      data
    );
  }
  addJobsToWorkorder(id, building, apartment, items) {
    return this.http.post<{ message: string; jobs: any; workorder: any }>(
      environment.apiUrl + '/workorderJobs',
      { id: id, building: building, apartment: apartment, items: items }
    );
  }
  addFinishDateToWorkorder(id) {
    return this.http.post<{ message: string; workorder: any }>(
      environment.apiUrl + '/workorderFinishDate',
      { id }
    );
  }
}
