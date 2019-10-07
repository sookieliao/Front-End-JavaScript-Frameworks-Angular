import { Component, OnInit, Inject } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  errMess: string[];


  constructor(private leaderService: LeaderService,
      @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    this.leaderService.getLeaders()
      .subscribe(
        leader => this.leaders = leader,
        errmess => this.errMess = <any>errmess);
  }

}