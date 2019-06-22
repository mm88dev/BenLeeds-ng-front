import { Component, OnInit } from '@angular/core';
import { WorkordersService } from 'src/app/services/workorders.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public workorders: any = [];
  public isLoading = false;

  public totalWo = 0;
  public woPerPage = 5;
  public currentPage = 1;
  public pageSizeOptions = [1, 2, 5, 10];
  constructor(
    public workdordersService: WorkordersService,
    public usersService: UsersService,
    public router: Router
  ) {}
  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.woPerPage = pageData.pageSize;
    this.workdordersService
      .getWorkorders(this.woPerPage, this.currentPage)
      .subscribe(res => {
        this.totalWo = res.count;
        this.workorders = res.workorders;
        this.isLoading = false;
      });
  }
  ngOnInit() {
    this.isLoading = true;
    this.workdordersService
      .getWorkorders(this.woPerPage, this.currentPage)
      .subscribe(res => {
        this.totalWo = res.count;
        this.workorders = res.workorders;
        this.isLoading = false;
      });
  }

  onShow(workorder, user) {
    this.router.navigate([`/admin/workorder/${workorder._id}`]);
  }
}
