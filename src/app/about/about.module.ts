import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { UserService } from './user.service';
import { UserComponent } from '../user/user.component';
import { ProgressComponent } from '../progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { ReposComponent } from '../repos/repos.component';


@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule,
  ],
  declarations: [AboutComponent, UserComponent, ReposComponent],
  providers: [UserService]
})
export class AboutModule { }
