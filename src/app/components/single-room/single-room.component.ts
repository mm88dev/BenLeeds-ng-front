import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';
import { RoomsService } from 'src/app/services/rooms.service';
import { ItemsService } from 'src/app/services/items.service';
import { Room } from 'src/app/models/room.model';
import { PageEvent } from '@angular/material';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-single-room',
  templateUrl: './single-room.component.html',
  styleUrls: ['./single-room.component.css']
})
export class SingleRoomComponent implements OnInit {
  isLoading = false;
  private enteredRoomId: number;
  public enteredRoom: Room = {name: "", _id: "", image: ""};
  items = [];

  public totalItems = 0;
  public itemsPerPage = 5;
  public currentPage = 1;
  public pageSizeOptions = [1, 2, 5, 10];

  constructor(
    private route: ActivatedRoute,
    private roomsService: RoomsService,
    private itemsService: ItemsService
  ) {}

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.itemsPerPage = pageData.pageSize;
    this.itemsService
      .getItems(this.itemsPerPage, this.currentPage)
      .subscribe(res => {
        this.totalItems = res.count;
        // this.items = res.items;
        this.isLoading = false;
      });
  }
  ngOnInit() {
    this.isLoading = true;
    this.enteredRoomId = this.route.snapshot.params['roomId'];
    this.roomsService.getRooms().subscribe(res => {
      this.enteredRoom = res.rooms.find(room => {
        return room._id == this.enteredRoomId;
      });
      console.log(this.enteredRoom);
    });
    
    this.itemsService
      .getItems(this.itemsPerPage, this.currentPage)
      .subscribe(res => {
        this.items = res.items.filter(item => {
          return item.room._id == this.enteredRoomId;
        });
        this.totalItems = this.items.length;
        this.isLoading = false;
      });
  }

  onCheck(checkInput, id, quantity, comment) {
    this.items.map(obj => {
      if (obj._id == id) {
        obj.quantity = quantity;
        obj.comment = comment;
        if (obj.status == 'ready') {
          obj.status = 'fixing';
        } else {
          obj.status = 'ready';
        }
      }
    });
    let submittedItem = this.items.find(item => {
      return item._id == id;
    });
    this.itemsService
      .editItem(submittedItem, checkInput.target.checked)
      .subscribe();
  }
  trackItem(index, item) {
    return item ? item.id : undefined;
  }
}
