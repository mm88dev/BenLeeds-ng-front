import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkordersService } from 'src/app/services/workorders.service';
import { Route, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-modal-workorder',
  templateUrl: './modal-workorder.component.html',
  styleUrls: ['./modal-workorder.component.css']
})
export class ModalWorkorderComponent implements OnInit {
  public workorders;
  public user = '';
  public woPerPage = 2;
  public currentPage = 1;
  constructor(
    private workordersService: WorkordersService,
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.workordersService
      .getWorkorders(this.woPerPage, this.currentPage)
      .subscribe(res => {
        console.log(res.workorders);
        this.workorders = res.workorders.filter(workorder => {
          return workorder.user._id == this.route.snapshot.params['userId'];
        });
        console.log(this.route.snapshot.params['userId']);
        console.log(this.workorders);
      });
    this.usersService.getUsers().subscribe(res => {
      this.user = res.users.find(user => {
        return user._id == this.route.snapshot.params['userId'];
      });
      console.log(this.user);
    });
  }
}
