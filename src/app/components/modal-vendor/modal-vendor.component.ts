import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkordersService } from 'src/app/services/workorders.service';
import { VendorsService } from 'src/app/services/vendors.service';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-modal-vendor',
  templateUrl: './modal-vendor.component.html',
  styleUrls: ['./modal-vendor.component.css']
})
export class ModalVendorComponent implements OnInit {
  private vendorId = '';
  public workorderId = '';
  isLoading = false;
  public vendor = { firstName: '', lastName: '' };
  constructor(
    private route: ActivatedRoute,
    private workordersService: WorkordersService,
    private vendorsService: VendorsService,
    private jobsService: JobsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.vendorId = this.route.snapshot.params['vendorId'];
    this.workorderId = this.route.snapshot.params['workorderId'];
    if (this.vendorId) {
      this.vendorsService.getVendors().subscribe(res => {
        this.vendor = res.vendors.find(v => {
          return v._id == this.vendorId;
        });
        this.isLoading = false;
        console.log(this.vendor);
      });
    }
  }
}
