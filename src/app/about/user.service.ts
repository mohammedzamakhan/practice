import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

@Injectable()
export class UserService {

  user;
  repos;
  constructor(private http: HttpClient) {}

  isInitialUser(username) {
    return username.toLowerCase() === environment.user;
  }

  getSavedUser(username) {
    return this.isInitialUser(username) && this.user;
  }

  getUser(username): Observable<any> {
    if (this.isInitialUser(username) && this.user) {
      return Observable.of(this.user);
    }
    return this.http
      .get(
        `${environment.apiUrl}/${username}?client_id=${environment.clientId}&client_secret=${environment.clientSecret}`
      )
      .do((user: any) => {
        if (this.isInitialUser(username)) {
          this.user = user;
        }
      })
      .catch(() => Observable.of({
        error: true
      }));
  }

  getRepos(username): Observable<any> {
    if (this.isInitialUser(username) && this.repos) {
      return Observable.of(this.repos);
    }
    return this.http
      .get(
        `https://api.github.com/users/${username}/repos?client_id=${environment.clientId}&client_secret=${environment.clientSecret}`
      )
      .do((repos: any) => {
        if (this.isInitialUser(username)) {
          this.repos = repos;
        }
      })
      .catch(() => Observable.of({
        error: true,
      }));
  }
}
