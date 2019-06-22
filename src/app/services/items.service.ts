import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private url = environment.apiUrl + '/items';

  constructor(private http: HttpClient) {}
  getItems(itemsPerPage?: number, currentPage?: number) {
    const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}`;

    return this.http.get<{ message: string; items: any; count: any }>(
      this.url + queryParams
    );
  }

  editItem(item, status) {
    return this.http.post<{ message: string; item: any }>(
      `${this.url}/${item.id}`,
      {
        item: item,
        status: status
      }
    );
  }
  resetItems() {
    return this.http.get<{ message: string; items: any }>(
      environment.apiUrl + '/itemsReset'
    );
  }

  createItemAdmin(name, subcat, room, price) {
    return this.http.post<{ message: string; item: any }>(
      environment.apiUrl + '/admin/item',
      {
        name: name,
        subcat: subcat,
        room: room,
        price: price
      }
    );
  }

  editItemAdmin(name, subcat, price, id) {
    return this.http.post<{ message: string; item: any }>(
      environment.apiUrl + `/admin/item/${id}`,
      {
        name: name,
        subcat: subcat,
        price: price
      }
    );
  }
  deleteItemAdmin(id) {
    return this.http.delete<{ message: string; item: any }>(
      environment.apiUrl + `/admin/item/${id}`
    );
  }
}
