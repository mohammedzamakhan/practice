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

  getSavedUser() {
    return this.user;
  }

  getUser(username): Observable<any> {
    if (username === environment.user && this.user) {
      return Observable.of(this.user);
    }
    return this.http
      .get(
        `${environment.apiUrl}/${username}?client_id=${environment.clientId}&client_secret=${environment.clientSecret}`
      )
      .do((user: any) => {
        if (user.login === environment.user) {
          this.user = user;
        }
      })
      .catch(() => Observable.of({
        error: true
      }));
  }

  getRepos(username): Observable<any> {
    if (username === environment.user && this.repos) {
      return Observable.of(this.repos);
    }
    return this.http
      .get(
        `https://api.github.com/users/${username}/repos?client_id=${environment.clientId}&client_secret=${environment.clientSecret}`
      )
      .do((repos: any) => {
        if (username === environment.user) {
          this.repos = repos;
        }
      })
      .catch(() => Observable.of({
        error: true,
      }));
  }
}
