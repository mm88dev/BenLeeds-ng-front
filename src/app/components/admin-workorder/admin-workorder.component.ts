import { Component, OnInit } from '@angular/core';
import { WorkordersService } from 'src/app/services/workorders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorsService } from 'src/app/services/vendors.service';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-admin-workorder',
  templateUrl: './admin-workorder.component.html',
  styleUrls: ['./admin-workorder.component.css']
})
export class AdminWorkorderComponent implements OnInit {
  public isLoading = false;
  public vendors;
  public workorder = { _id: '', user: '', jobs: [] };
  public woPerPage = 2;
  public currentPage = 1;
  constructor(
    private route: ActivatedRoute,
    private workordersService: WorkordersService,
    private vendorsService: VendorsService,
    private jobsService: JobsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.workordersService.getWorkorders(this.woPerPage, this.currentPage).subscribe(res => {
      this.workorder = res.workorders.find(workorder => {
        return workorder._id == this.route.snapshot.params.workorderId;
      });
      console.log(this.workorder);
    });
    this.vendorsService.getVendors().subscribe(res => {
      this.vendors = res.vendors;
      this.isLoading = false;
    });
  }
  onSend(job, vendor, date, comment) {
    const answer = confirm(
      `Are you sure you want to send a job to vendor '${vendor || ''}'?`
    );
    if (answer) {
      const submittedJob = this.workorder.jobs.find(j => {
        return j._id == job._id;
      });
      submittedJob.status = 'sent';
      console.log(vendor);
      submittedJob.vendor.firstName = vendor;

      const vendorId = this.vendors.find(vend => {
        return vend.firstName == vendor;
      })._id;

      this.jobsService
        .editAndSendJob(job._id, vendorId, date, comment)
        .subscribe();
    }
  }
  onChange(job) {
    const submittedJob = this.workorder.jobs.find(j => {
      return j._id == job._id;
    });
    submittedJob.status = 'created';
  }

  onShowSchedule(selectedVendor) {
    const chosenVendor = this.vendors.find(v => {
      return v.firstName == selectedVendor;
    });
    this.router.navigate([
      `/admin/workorder/${this.workorder._id}/${chosenVendor._id}`
    ]);
  }
}
