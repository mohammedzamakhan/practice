import { environment } from '../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'tk-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public user;
  public repos = [];

  search = environment.user;
  loading = true;

  @ViewChild('searchStream') public searchStream;
  error = true;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.searchStream.valueChanges
      .startWith(environment.user)
      .debounce(
        (value) =>
          this.userService.getSavedUser(value)
            ? Observable.timer(0)
            : Observable.timer(500)
      )
      .filter((value: string) => value && value.length > 4)
      .distinctUntilChanged()
      .do(() => (this.loading = true))
      .switchMap(value =>
        this.userService.getUser(value).switchMap(user =>
          this.userService.getRepos(user.login).map(repos => ({
            ...user,
            repos
          }))
        )
      )
      .subscribe((user: any) => {
        this.loading = false;
        if (user.error) {
          this.error = true;
        } else {
          this.error = false;
          this.user = user;
          this.repos = user.repos;
        }
      });
  }
}
