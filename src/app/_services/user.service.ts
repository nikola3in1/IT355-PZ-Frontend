import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


interface myData {
  message: string,
  success: boolean,
  type: number,
  initLogin:boolean,
  username:string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router, private Auth: AuthService) { }
  authPath(type,route) {
    if(route==null){
      route=type;
      if(type=='user'){
        route='profile';
      }
    }

    this.auth().subscribe((data) => {
      if (data.message == type) {
        console.log(data,route,'data srv')
        //Ako je prvi login, podesi profil
        this.Auth.setUsername(data.username);
        if(data.initLogin){
          this.Auth.setLoggedIn(true);
          this.router.navigate(['/profile/edit']);
        }else if(data.message=="user"){
          // console.log('obde?')
          this.router.navigate([route]);
        }else if(data.message=="admin"){
          this.router.navigate([route]);
        }
      }else {
        this.router.navigate([""]);
      }
    });
  }

  isLogged(type){
    this.auth().subscribe(data=>{
      if(data.message && data.success){
        if(data.message=='admin' && type=='admin'){
          this.Auth.setIsAdmin(true);
        }else if(data.message=='user' && type=='user'){
          this.Auth.setLoggedIn(true);
        }
        this.Auth.setUsername(data.username);
      }else{
        this.Auth.logout();
      }
    });
  }


  auth() {
    console.log('called');
    return this.http.get<myData>('http://localhost:3131/user', { withCredentials: true })
  }

}
