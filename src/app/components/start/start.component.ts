import { Component, OnInit } from '@angular/core';
import { BuildingsService } from 'src/app/services/buildings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkordersService } from 'src/app/services/workorders.service';
import { Building } from 'src/app/models/building.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  regionId: number;
  buildings: Building[];
  workorderId;
  userId;
  user;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private buildingsService: BuildingsService,
    private workordersService: WorkordersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params['userId'];
    this.usersService.getUsers().subscribe(res => {
      this.user = res.users.find(user => {
        return user._id == this.userId;
      });
      this.buildingsService.getBuildings().subscribe(res => {
        this.buildings = res.buildings.filter(building => {
          return building.regionId == this.user.regionId;
        });
      });
    });
  }

  onSubmit(building, apartment) {
    if(!apartment){
      alert("Please insert apartment number!")
      return;
    }
    this.workordersService
      .createWorkorder(building, apartment, this.user)
      .subscribe(res => {
        this.workorderId = res.workorder._id;
        this.router.navigate([`/worker/${this.userId}/${this.workorderId}`]);
      });
  }
}
