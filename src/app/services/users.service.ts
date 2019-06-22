import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[] = [];
  private url: string = environment.apiUrl + '/users';

  constructor(private http: HttpClient, private router: Router) {}

  getUsers(usersPerPage?: number, currentPage?: number) {
    const queryParams = `?pagesize=${usersPerPage}&page=${currentPage}`;
    return this.http.get<{ message: string; users: any; count: any }>(
      this.url + queryParams
    );
  }

  getRegionId(email: string): string {
    const user = this.users.find(user => {
      return user.email === email;
    });
    return user.regionId;
  }

  createUser(name: string, email: string, password: string, regionId: string) {
    const newUser: User = {
      name,
      email,
      password,
      regionId
    };
    return this.http.post<{ message: string; user: any }>(
      environment.apiUrl + '/admin/user',
      newUser
    );
  }

  editUser(
    _id: string,
    name: string,
    email: string,
    password: string,
    regionId: string
  ) {
    const editUser: User = {
      name,
      email,
      password,
      regionId
    };
    return this.http.post<{ message: string; user: any }>(
      environment.apiUrl + `/admin/user/${_id}`,
      editUser
    );
  }

  deleteUser(_id: string) {
    return this.http.delete<{ message: string; user: any }>(
      environment.apiUrl + `/admin/user/${_id}`
    );
  }
}
