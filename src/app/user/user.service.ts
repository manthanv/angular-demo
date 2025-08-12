import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUserList() {
    return this.httpClient.get<User[]>('https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json');
  }
}
