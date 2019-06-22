import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  public editName;
  public editEmail;
  public editRegionId;
  public editPassword;
  public isLoading = false;
  public editUserId = '';
  public users = [];
  public regions = [];
  public showNewUser = false;
  public showEdit = false;

  public totalUsers = 0;
  public usersPerPage = 5;
  public currentPage = 1;
  public pageSizeOptions = [1, 2, 5, 10];

  constructor(private usersService: UsersService, private router: Router) {}

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.usersPerPage = pageData.pageSize;
    this.usersService
      .getUsers(this.usersPerPage, this.currentPage)
      .subscribe(res => {
        this.totalUsers = res.count;
        this.users = res.users;
        this.isLoading = false;
      });
  }
  ngOnInit() {
    this.isLoading = true;
    this.usersService
      .getUsers(this.usersPerPage, this.currentPage)
      .subscribe(res => {
        this.totalUsers = res.count;
        this.users = res.users;
        for (let i = 0; i < this.users.length; i++) {
          if (this.regions.indexOf(this.users[i].regionId) == -1) {
            this.regions.push(this.users[i].regionId);
          }
        }
        this.isLoading = false;
      });
  }
  onCreate() {
    this.showNewUser = true;
  }
  onCancel() {
    this.showNewUser = false;
  }
  onSave(name, email, password, regionId) {
    let answer = confirm(
      `Are you sure you want to add new user '${name || ''}'?`
    );
    if (answer) {
      this.isLoading = true;
      this.usersService
        .createUser(name, email, password, regionId)
        .subscribe(res => {
          this.usersService
            .getUsers(this.usersPerPage, this.currentPage)
            .subscribe(res => {
              this.totalUsers = res.count;
              this.users = res.users;
              this.showNewUser = false;
              this.isLoading = false;
            });
        });
    }
  }

  onDelete(user) {
    let answer = confirm(
      `Are you sure you want to delete user '${user.firstName ||
        ''} ${user.lastName || ''}'?`
    );
    if (answer) {
      this.isLoading = true;
      this.usersService.deleteUser(user._id).subscribe(res => {
        this.usersService
          .getUsers(this.usersPerPage, this.currentPage)
          .subscribe(res => {
            this.totalUsers = res.count;
            this.users = res.users;
            this.isLoading = false;
          });
      });
    }
  }
  onEdit(user) {
    this.editUserId = user._id;
  }
  onEditCancel() {
    this.isLoading = true;
    this.usersService
      .getUsers(this.usersPerPage, this.currentPage)
      .subscribe(res => {
        this.totalUsers = res.count;
        this.users = res.users;
        this.resetEditInfo();
        this.editUserId = '';
        this.isLoading = false;
      });
  }
  onEditSave(user, name, email, password, regionId) {
    let n = name || user.name;
    let e = email || user.email;
    let p = password || user.password;
    let r = regionId || user.regionId;
    console.log(user._id, n, e, p, r);
    let answer = confirm(
      `Are you sure you want to edit user '${user.name ||
        ''}'?`
    );
    if (answer) {
      this.isLoading = true;
      this.usersService.editUser(user._id, n, e, p, r).subscribe(res => {
        console.log(res);
        this.usersService
          .getUsers(this.usersPerPage, this.currentPage)
          .subscribe(res => {
            this.totalUsers = res.count;
            this.users = res.users;
            this.resetEditInfo();
            this.showNewUser = false;
            this.editUserId = '';
            this.isLoading = false;
          });
      });
    }
  }

  onShow(user) {
    this.router.navigate([`/admin/users/${user._id}`]);
  }

  resetEditInfo() {
    this.editName = undefined;
    this.editEmail = undefined;
    this.editPassword = undefined;
    this.editRegionId = undefined;
  }
}
