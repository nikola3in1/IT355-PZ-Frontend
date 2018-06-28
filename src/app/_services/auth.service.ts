import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

interface myData{
  success:boolean,
  message:string,
  type:number
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn')||'false');
  private isAdminStatus= JSON.parse(localStorage.getItem('isAdmin')||'false');
  private username:string = localStorage.getItem('username')||null;
  constructor(private http: HttpClient) { }

  logout(){
    this.setLoggedIn(false);
    this.setIsAdmin(false);
    this.setUsername(null);
    console.log(this.isAdmin);
    return this.http.get<any>('http://localhost/IT255-PZ-Backend/logout.php',{withCredentials:true});
  }

  setLoggedIn(value:boolean){
    this.loggedInStatus= value;
    localStorage.setItem('loggedIn',value.toString());
  }

  setUsername(value:string){
    this.username=value;
    localStorage.setItem('username',value);
  }

  setIsAdmin(value:boolean){
    console.log(value,'admin value set');
    this.isAdminStatus= value;
    localStorage.setItem('isAdmin',value.toString());
  }

  get getUsername(){
    return localStorage.getItem('username')||this.username;
  }

  get isAdmin(){
    return JSON.parse(localStorage.getItem('isAdmin')|| this.isAdminStatus);
  }

  get isLoggedIn(){
    return JSON.parse(localStorage.getItem('loggedIn')|| this.loggedInStatus);
  }

  // headers = new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded'});  
  getUserDetails(username,password){
    //post these to API server return user info if correct
    const body = {
      username,
      password,
    };

    return this.http.post<myData>('http://localhost/IT255-PZ-Backend/login.php',body,{
      withCredentials:true
    });
  }

  getCreatorDetails(){
    return this.http.get<any>('http://localhost/IT255-PZ-Backend/getProfile.php',{withCredentials:true});
  }

  signUp(username,password,email,firstname,lastname){
    const body={
      username,
      email,
      password,
      firstname,
      lastname
    }
    return this.http.post<any>('http://localhost/IT255-PZ-Backend/register.php',body,{withCredentials:true});
  }

  editProfile(body){
    const headers = new HttpHeaders().set('Content-Type', []);

    return this.http.post<any>('http://localhost/IT255-PZ-Backend/editProfile.php',body,{
      reportProgress:true,
      headers:headers,
      observe: 'events',
      withCredentials:true
    });
  }

  uploadSong(body){
    const headers = new HttpHeaders().set('Content-Type', []);

    return this.http.post<any>('http://localhost/IT255-PZ-Backend/upload.php',body,{
      reportProgress:true,
      headers:headers,
      observe: 'events',
      withCredentials:true
    });
  }
  
  deleteSong(songname,creator){
    const body={
      'songname':songname,
      'creator':creator
    }
    console.log(body,'body');

    return this.http.post<any>('http://localhost/IT255-PZ-Backend/deleteSong.php',body,{withCredentials:true});
  }

  deleteReport(id){
    const body={
      'reportid':id
    }
    return this.http.post<any>('http://localhost/IT255-PZ-Backend/deleteReport.php',body,{withCredentials:true});
  }

  deleteCreator(creator){
    const body={
      'creator':creator
    }
    return this.http.post<any>('http://localhost/IT255-PZ-Backend/deleteCreator.php',body,{withCredentials:true});
  }

  reportSong(reason,creator,songname,reportedBy){
    const body={
      'reason':reason,
      'songname':songname,
      'creator':creator,
      'reportedBy':reportedBy
    }
    return this.http.post<any>('http://localhost/IT255-PZ-Backend/report.php',body,{withCredentials:true});
  }

  getReports(){
    return this.http.get<any>('http://localhost/IT255-PZ-Backend/getReports.php',{withCredentials:true});
  }

  addGenre(name,about){
    const body={
      name,
      about
    }
    return this.http.post<any>('http://localhost/IT255-PZ-Backend/addGenre.php',body,{withCredentials:true});
  }

  removeGenre(name){
    const body={
      name,
    }
    return this.http.post<any>('http://localhost/IT255-PZ-Backend/deleteGenre.php',body,{withCredentials:true});
  }

}
