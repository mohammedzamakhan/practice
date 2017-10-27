import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const API_URL = 'https://hooks.slack.com/services/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';

@Injectable()
export class SlackService {

  constructor(private http: HttpClient) { }

  send(slackObject: object) {
    const header = new HttpHeaders();
    header.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return this.http.post(API_URL, JSON.stringify(slackObject), {
      headers: header
    });
  }

}
