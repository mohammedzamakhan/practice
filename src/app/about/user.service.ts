import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(username) {
    return this.http
      .get(
        `${environment.apiUrl}/${username}?client_id=${environment.clientId}&client_secret=${environment.clientSecret}`
      )
      .catch(() => Observable.of({
        error: true
      }));
  }
}
