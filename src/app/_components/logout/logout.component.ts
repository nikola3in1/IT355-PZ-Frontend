import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,private auth:AuthService) { }

  ngOnInit() {
    this.auth.logout().subscribe(data=>{
    this.router.navigate(['']);
    });
  }

}
