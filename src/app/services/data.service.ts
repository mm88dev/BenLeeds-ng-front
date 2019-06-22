import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item.model';
import { Room } from '../models/room.model';
import { Building } from '../models/building.model';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {
  private users: User[];
  private buildings: Building[];
  private rooms: Room[];
  private items: Item[];

  constructor(private http: HttpClient) {}
  ngOnInit() {}
  getAllData() {
    return this.http.get<{
      message: string;
      users: User[];
      buildings: Building[];
      rooms: Room[];
      items: Item[];
    }>(environment.apiUrl + '/all');
  }
  getUsers() {
    return [...this.users];
  }
  getBuildings() {
    return [...this.buildings];
  }
  getRooms() {
    return [...this.rooms];
  }
  getItems() {
    return this.items;
  }
}
