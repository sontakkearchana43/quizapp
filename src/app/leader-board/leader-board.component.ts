import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toaster } from '../app-functions';
import { User } from '../app.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent implements OnInit {
  topList:User[] = [];
  constructor(private appService:AppService,private router:Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.appService.getLeaderBoardMembers().subscribe((res) => {
      this.topList = res.sort((a:User, b:User) => (a.score > b.score) ? -1 : 1);
    })
  }
  
  restart(){
    this.router.navigate(["/quiz"])
  }

  logout(){
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
    toaster(`You have been successfully logged out....`);
  }

}
