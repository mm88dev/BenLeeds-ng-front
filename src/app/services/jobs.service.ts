import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private url: string = environment.apiUrl +'/job';
  constructor(private http: HttpClient) {}

  getJobs(jobsPerPage?: number, currentPage?: number) {
    const queryParams = `?pagesize=${jobsPerPage}&page=${currentPage}`;
    return this.http.get<{ message: string; jobs: any; count: any }>(
      environment.apiUrl +'/jobs' + queryParams
    );
  }

  editAndSendJob(jobId, vendorId, date, comment) {
    return this.http.post<{ message: string; job: any; vendor: any }>(
      this.url,
      {
        jobId: jobId,
        adminComment: comment,
        endDate: date,
        vendorId: vendorId
      }
    );
  }
}
