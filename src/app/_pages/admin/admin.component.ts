import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  message = "Loading....";
  report:boolean =true;
  addGenre:boolean =false;
  remove:boolean=false;

  constructor(private user: UserService,private router:Router) { }

  ngOnInit() {
    this.user.authPath("admin",null);
  }

  toggleReports(){
    this.report=true;
    this.addGenre=false;
    this.remove=false;
  }
  toggleGenres(){
    this.report=false;
    this.addGenre=true;
    this.remove=false;
  }
  toggleRemove(){
    console.log('das')
    this.remove=true;
    this.report=false;
    this.addGenre=false;
  }

}
