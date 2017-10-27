import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tk-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {

  @Input() repos = [];
  @Input() username;

  constructor() { }

  ngOnInit() {
  }

  goToRepo(repo) {
    window.open(repo.svn_url, '_blank');
  }

}
