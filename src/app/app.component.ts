import { Component } from '@angular/core';
import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(private user : AuthService, private auth: UserService){
    // if(user.isLoggedIn){
    //   auth.isLogged('user');
    // }
    this.auth.auth().subscribe(data=>{
      console.log(data, " Data");
      if(!data.success){
        user.logout();
      }
    })
  }
}
