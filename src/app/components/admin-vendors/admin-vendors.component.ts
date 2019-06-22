import { Component, OnInit } from '@angular/core';
import { VendorsService } from 'src/app/services/vendors.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-admin-vendors',
  templateUrl: './admin-vendors.component.html',
  styleUrls: ['./admin-vendors.component.css']
})
export class AdminVendorsComponent implements OnInit {
  public vendors = [];
  public showNewVendor = false;
  public isLoading = false;
  public editVendorId = '';

  public editLastName;
  public editFirstName;
  public editEmail;
  public editCategory;
  public showEdit = false;

  public totalVendors = 0;
  public vendorsPerPage = 5;
  public currentPage = 1;
  public pageSizeOptions = [1, 2, 5, 10];
  constructor(private vendorsService: VendorsService) {}

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.vendorsPerPage = pageData.pageSize;
    this.vendorsService
      .getVendors(this.vendorsPerPage, this.currentPage)
      .subscribe(res => {
        this.totalVendors = res.count;
        this.vendors = res.vendors;
        this.isLoading = false;
      });
  }

  ngOnInit() {
    this.isLoading = true;
    this.vendorsService
      .getVendors(this.vendorsPerPage, this.currentPage)
      .subscribe(res => {
        this.totalVendors = res.count;
        this.vendors = res.vendors;
        this.isLoading = false;
      });
  }

  onCreate() {
    this.showNewVendor = true;
    this.isLoading = false;
  }
  onCancel() {
    this.showNewVendor = false;
    this.isLoading = false;
  }
  onSave(firstName, lastName, email, category) {
    const answer = confirm(
      `Are you sure you want to add new vendor '${firstName || ''} ${lastName ||
        ''}'?`
    );
    if (answer) {
      this.isLoading = true;
      this.vendorsService
        .createVendor(firstName, lastName, email, category)
        .subscribe(res => {
          this.vendorsService
            .getVendors(this.vendorsPerPage, this.currentPage)
            .subscribe(res => {
              this.totalVendors = res.count;
              this.vendors = res.vendors;
              this.showNewVendor = false;
              this.isLoading = false;
            });
        });
    }
  }

  onDelete(vendor) {
    const answer = confirm(
      `Are you sure you want to delete vendor '${vendor.firstName ||
        ''} ${vendor.lastName || ''}'?`
    );
    if (answer) {
      this.isLoading = true;
      this.vendorsService.deleteVendor(vendor._id).subscribe(res => {
        this.vendorsService
          .getVendors(this.vendorsPerPage, this.currentPage)
          .subscribe(res => {
            this.totalVendors = res.count;
            this.vendors = res.vendors;
            this.isLoading = false;
          });
      });
    }
  }
  onEdit(vendor) {
    this.editVendorId = vendor._id;
  }
  onEditCancel() {
    this.isLoading = true;
    this.vendorsService
      .getVendors(this.vendorsPerPage, this.currentPage)
      .subscribe(res => {
        this.totalVendors = res.count;
        this.vendors = res.vendors;
        this.resetEditInfo();
        this.editVendorId = '';
        this.isLoading = false;
      });
  }
  onEditSave(vendor, firstName, lastName, email, category) {
    const f = firstName || vendor.firstName;
    const l = lastName || vendor.lastName;
    const e = email || vendor.email;
    const c = category || vendor.password;
    const answer = confirm(
      `Are you sure you want to edit vendor '${vendor.firstName ||
        ''} ${vendor.lastName || ''}'?`
    );
    if (answer) {
      this.isLoading = true;
      this.vendorsService.editVendor(vendor._id, f, l, e, c).subscribe(res => {
        this.vendorsService
          .getVendors(this.vendorsPerPage, this.currentPage)
          .subscribe(res => {
            this.totalVendors = res.count;
            this.vendors = res.vendors;
            this.resetEditInfo();
            this.showNewVendor = false;
            this.editVendorId = '';
            this.isLoading = false;
          });
      });
    }
  }
  resetEditInfo() {
    this.editFirstName = undefined;
    this.editLastName = undefined;
    this.editEmail = undefined;
    this.editCategory = undefined;
  }
}
