import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { ContentService } from '../../_services/content.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  message = "Loading....";
  username = "Nikola1"
  firstname;
  lastname;
  about = "asdasdasddasdasdasasdasdadsa"
  nrSongs = 42;
  songs = [];
  gotSongs = false;
  earned: number;
  url;

  phoneProfile = true;

  constructor(private Auth: AuthService, private user: UserService, private router: Router, private content: ContentService) {
    user.authPath("user", null);
  }

  reload() {
    // this.username = this.Auth.getUsername;
    // console.log(this.username," local username ")
    // this.content.getByCreator(this.username).subscribe(data => {
    //   console.log(data.songs.length, 'reload');
    //   if (data.songs.length >= 0) {
    //     this.songs = data.songs;
    //     this.gotSongs = true;
    //   }
    // });
    this.Auth.getCreatorDetails().subscribe(data => {
      this.url = "http://localhost:3131/rest/content/resource?p=" + data.slika;
      this.about = data.about;
      if (data.songs.length > 0) {
        this.songs = data.songs;
        this.gotSongs = true;
      } else {
        this.songs = [];
        this.gotSongs = false;
      }
      this.nrSongs = data.songs.length;
      this.earned = +data.zarada;
      console.log(this.earned);
      this.firstname = data.ime;
      this.lastname = data.prezime;
      console.log(data, 'user details');
    });
  }

  ngOnInit() {
    //ako je manje od 768px kusur
    if (window.screen.width > 991) {
      this.phoneProfile = false;
      console.log(this.phoneProfile);
    }

    this.Auth.getCreatorDetails().subscribe(data => {
      this.url = "http://localhost:3131/rest/content/resource?p=" + data.slika;
      this.about = data.about;
      if (data.songs.length > 0) {
        this.songs = data.songs;
        this.gotSongs = true;
      }
      this.nrSongs = data.songs.length;
      this.earned = +data.zarada;
      console.log(this.earned);
      this.firstname = data.ime;
      this.lastname = data.prezime;
      console.log(data, 'user details');
    });
    this.username = this.Auth.getUsername;
  }
}
