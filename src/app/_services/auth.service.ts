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
    return this.http.get<any>('http://localhost:3131/logout',{withCredentials:true});
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
   
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username+":"+password) });
    return this.http.get<myData>('http://localhost:3131/login',{
      withCredentials:true,
      headers:headers
    });
  }

  getCreatorDetails(){
    return this.http.get<any>('http://localhost:3131/rest/user/profile',{withCredentials:true});
  }

  signUp(username,password,email,firstname,lastname){
    const body={
      username,
      email,
      password,
      firstname,
      lastname
    }
    return this.http.post<any>('http://localhost:3131/register',body,{withCredentials:true});
  }

  editProfile(body){
    const headers = new HttpHeaders().set('Content-Type', []);

    return this.http.post<any>('http://localhost:3131/rest/user/updateProfile',body,{
      reportProgress:true,
      headers:headers,
      observe: 'events',
      withCredentials:true
    });
  }

  uploadSong(body){
    const headers = new HttpHeaders().set('Content-Type', []);

    return this.http.post<any>('http://localhost:3131/rest/user/upload',body,{
      reportProgress:true,
      headers:headers,
      observe: 'events',
      withCredentials:true
    });
  }
  
  deleteSong(songname){
    const body={
      'songname':songname
    }
    console.log(body,'body');

    return this.http.post<any>('http://localhost:3131/rest/user/deleteSong',body,{withCredentials:true});
  }


  deleteSongAdmin(creator,songname){
    const body={
      'creator': creator,
      'songName':songname
    }
    return this.http.post<any>('http://localhost:3131/rest/admin/deleteSong',body,{withCredentials:true});
  }

  deleteReport(id){
    const body={
      'reportid':id
    }
    return this.http.post<any>('http://localhost:3131/rest/admin/deleteReport',body,{withCredentials:true});
  }

  deleteCreator(creator){
    const body={
      'creator':creator
    }
    return this.http.post<any>('http://localhost:3131/rest/admin/deleteCreator',body,{withCredentials:true});
  }

  reportSong(reason,creator,songname){
    const body={
      'reason':reason,
      'songname':songname,
      'creator':creator
    }
    return this.http.post<any>('http://localhost:3131/rest/user/report',body,{withCredentials:true});
  }

  getReports(){
    return this.http.get<any>('http://localhost:3131/rest/admin/reports',{withCredentials:true});
  }

  addGenre(name,about){
    const body={
      name,
      about
    }
    return this.http.post<any>('http://localhost:3131/rest/admin/addGenre',body,{withCredentials:true});
  }

  removeGenre(name){
    const body={
      name,
    }
    return this.http.post<any>('http://localhost:3131/rest/admin/deleteGenre',body,{withCredentials:true});
  }

}
