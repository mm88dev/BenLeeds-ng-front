import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room.model';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: Room[];
  isLoading = false;
  constructor(private roomsService: RoomsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.roomsService.getRooms().subscribe(res => {
      this.rooms = res.rooms;
      console.log(this.rooms);
      this.isLoading = false;
    });
  }
}
