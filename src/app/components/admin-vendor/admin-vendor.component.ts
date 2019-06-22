import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorsService } from 'src/app/services/vendors.service';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-admin-vendor',
  templateUrl: './admin-vendor.component.html',
  styleUrls: ['./admin-vendor.component.css']
})
export class AdminVendorComponent implements OnInit {
  private vendorId;
  public workorder;
  public isLoading = false;
  public vendor = { firstName: '', lastName: '' };

  constructor(
    private route: ActivatedRoute,
    private vendorsService: VendorsService,
    private jobsService: JobsService,
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.vendorId = this.route.snapshot.params['vendorId'];
    this.vendorsService.getVendors().subscribe(res => {
      this.vendor = res.vendors.find(v => {
        return v._id == this.vendorId;
      });
      console.log(this.vendor);
    });
    this.jobsService.getJobs().subscribe((res) => {
      this.isLoading = false;
    })
  }
}
