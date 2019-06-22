import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Building } from '../models/building.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuildingsService {
  private url: string = environment.apiUrl +'/buildings';
  constructor(private http: HttpClient) {}
  getBuildings() {
    return this.http.get<{ message: string, buildings: Building[] }>(this.url);
  }

}
