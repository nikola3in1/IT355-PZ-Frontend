import { Component } from '@angular/core';
import { ContentService } from './_services/content.service';
import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(content : ContentService, private user : AuthService, private auth: UserService){
    if(user.isLoggedIn){
    auth.isLogged('user');
    }
    content.getIp();
  }
}
