import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {
  private url: string = environment.apiUrl + '/vendors';
  constructor(private http: HttpClient) {}
  getVendors(vendorsPerPage?: number, currentPage?: number) {
    const queryParams = `?pagesize=${vendorsPerPage}&page=${currentPage}`;
    return this.http.get<{ message: string; vendors: any; count: any }>(
      this.url + queryParams
    );
  }
  createVendor(firstName, lastName, email, category) {
    return this.http.post<{ message: string; vendor: any }>(
      environment.apiUrl + '/vendor',
      {
        firstName,
        lastName,
        email,
        category
      }
    );
  }

  editVendor(id, firstName, lastName, email, category) {
    return this.http.post<{ message: string; vendor: any }>(
      environment.apiUrl + `/vendor/${id}`,
      {
        firstName,
        lastName,
        email,
        category
      }
    );
  }
  deleteVendor(id) {
    return this.http.delete<{ message: string; user: any }>(
      environment.apiUrl + `/vendor/${id}`
    );
  }
}
