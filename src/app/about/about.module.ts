import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    HttpClientModule,
  ],
  declarations: [AboutComponent],
  providers: [UserService]
})
export class AboutModule { }
