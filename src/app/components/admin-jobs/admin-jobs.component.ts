import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { WorkordersService } from 'src/app/services/workorders.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-admin-jobs',
  templateUrl: './admin-jobs.component.html',
  styleUrls: ['./admin-jobs.component.css']
})
export class AdminJobsComponent implements OnInit {
  public jobs = [];
  public isLoading = false;
  public totalJobs = 0;
  public jobsPerPage = 5;
  public currentPage = 1;
  public pageSizeOptions = [1, 2, 5, 10];

  constructor(
    private jobsService: JobsService,
    private workordersService: WorkordersService,
    private router: Router
  ) {}
  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.jobsPerPage = pageData.pageSize;
    this.jobsService
      .getJobs(this.jobsPerPage, this.currentPage)
      .subscribe(res => {
        this.totalJobs = res.count;
        this.jobs = res.jobs;
        this.isLoading = false;
      });
  }
  ngOnInit() {
    this.isLoading = true;
    this.jobsService.getJobs(this.jobsPerPage, this.currentPage).subscribe(res => {
      this.totalJobs = res.count;
      this.jobs = res.jobs;
      this.isLoading = false;
    });
  }
  onChoose(job) {
    let chosenWorkorder;
    this.workordersService.getWorkorders().subscribe(res => {
      chosenWorkorder = res.workorders.find(workorder => {
        return workorder.jobs.indexOf(job);
      });
      this.router.navigate([`/admin/workorder/${chosenWorkorder._id}`]);
    });
  }
}
