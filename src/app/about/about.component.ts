import {environment} from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'tk-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public user = {};

  public search$ = new BehaviorSubject(environment.user);
  error = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.search$
    .debounceTime(200)
    .filter((value: string) => value.length > 4)
    .switchMap((value) => this.userService.getUser(value))
    .subscribe((user: any) => {
      if (user.error) {
        this.error = true;
      } else {
        this.error = false;
        this.user = user;
      }
    });
  }

  public searchUser(e): void {
    this.userService.getUser(e.target.value)
      .subscribe(console.log);
  }

}
