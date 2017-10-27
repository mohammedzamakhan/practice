import { Component, OnInit } from '@angular/core';
import { SlackService } from '../slack.service';

@Component({
  selector: 'tk-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedback;
  sent = false;
  constructor(private sl: SlackService) { }

  ngOnInit() {
  }

  sendFeedback() {
    this.sl.send({
      text: this.feedback
    }).subscribe(() => this.sent = true, () => this.sent = true);
  }

}
