import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildingsService } from 'src/app/services/buildings.service';
import { Building } from 'src/app/models/building.model';
import { ItemsService } from 'src/app/services/items.service';
import { WorkordersService } from 'src/app/services/workorders.service';
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rooms-header',
  templateUrl: './rooms-header.component.html',
  styleUrls: ['./rooms-header.component.css']
})
export class RoomsHeaderComponent implements OnInit {
  isLoading = false;
  loggedRegion: string;
  building = '';
  apartment = '';
  submitDate;
  workorderId;
  userId;
  public woPerPage = 2;
  public currentPage = 1;

  constructor(
    private route: ActivatedRoute,
    private workordersService: WorkordersService,
    private router: Router,
    private itemsService: ItemsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.workorderId = this.route.snapshot.params['workorderId'];
    this.workordersService.getWorkorders().subscribe(res => {
      let workorder = res.workorders.find(workorder => {
        return workorder._id == this.workorderId;
      });
      this.building = workorder.buildingNumber;
      this.apartment = workorder.apartmentNumber;
      this.submitDate = workorder.submitDate;
    });
   
    this.userId = this.route.snapshot.params['userId'];
    this.isLoading = false;
  }
  onHome() {
    this.router.navigate([`/worker/${this.userId}/${this.workorderId}`]);
  }

  onFinish() {
    this.itemsService.getItems().subscribe(res => {
      let fixingItems = res.items.filter(item => {
        return item.status == 'fixing';
      });
      let ids = [];
      for (let i = 0; i < fixingItems.length; i++) {
        ids.push(fixingItems[i].id);
      }
      this.workordersService
        .addFinishDateToWorkorder(this.workorderId)
        .subscribe(res => {
          console.log(res);
        });
      this.router.navigate([
        `/worker/${this.userId}/${this.workorderId}/workorder`
      ]);
    });
  }
  onLogout() {
    let answer = confirm('Are you sure you want to logout?');
    if (answer) {
      this.authService.logout();
    }
  }
}
