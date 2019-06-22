import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkordersService } from 'src/app/services/workorders.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-rooms-workorder',
  templateUrl: './rooms-workorder.component.html',
  styleUrls: ['./rooms-workorder.component.css']
})
export class RoomsWorkorderComponent implements OnInit {
  public isLoading = false;
  public workorder;
  private workorderId;
  private userId;
  public fixingItems = [];
  public sum = 0;
  public submitDate;
  public building;
  public apartment;
  public woPerPage = 2;
  public currentPage = 1;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workordersService: WorkordersService,
    private itemsService: ItemsService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.workorderId = this.route.snapshot.params['workorderId'];
    this.userId = this.route.snapshot.params['userId'];
    this.itemsService.getItems().subscribe(res => {
      this.fixingItems = res.items.filter(item => {
        return item.status == 'fixing';
      });
      console.log(this.fixingItems);
      this.sum = 0;
      for (let i = 0; i < this.fixingItems.length; i++) {
        let totalPrice =
          (this.fixingItems[i].quantity || 1) * this.fixingItems[i].price;
        console.log(this.sum);
        this.sum += totalPrice;
      }
    });
    this.workordersService.getWorkorders(this.woPerPage, this.currentPage).subscribe(res => {
      let workorder = res.workorders.find(workorder => {
        return workorder._id == this.workorderId;
      });
      this.building = workorder.building;
      this.apartment = workorder.apartment;
      this.submitDate = workorder.submitDate;
      this.isLoading = false;
    });
  }
  onBack() {
    this.router.navigate([`/worker/${this.userId}/${this.workorderId}`]);
  }
  onSend() {
    this.workordersService
      .addJobsToWorkorder(
        this.workorderId,
        this.building,
        this.apartment,
        this.fixingItems
      )
      .subscribe(res => {
        console.log(res.workorder);
        console.log(res.jobs);
      });
    // resetuj iteme
    this.itemsService.resetItems().subscribe(() => {});
    // route navigate na start page
    this.router.navigate([`/worker/${this.userId}`]);
  }
}
