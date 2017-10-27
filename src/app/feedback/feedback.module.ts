import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';
import { SlackService } from '../slack.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    SharedModule
  ],
  declarations: [FeedbackComponent],
  providers: [SlackService]
})
export class FeedbackModule { }
