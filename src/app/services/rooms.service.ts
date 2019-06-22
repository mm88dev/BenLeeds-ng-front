import { Injectable } from '@angular/core';
import { Room } from '../models/room.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  constructor(private http: HttpClient) {}
  private rooms: Room[] = [];
  private url = environment.apiUrl + '/rooms';
  getRooms() {
    return this.http.get<{ message: string; rooms: any }>(this.url);
  }
}
