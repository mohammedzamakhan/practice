import { Component, Input } from '@angular/core';

@Component({
  selector: 'tk-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent  {

  @Input() user: any = {};
  constructor() { }

}
