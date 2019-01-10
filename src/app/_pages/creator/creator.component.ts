import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../../_services/content.service';
import { AuthService } from '../../_services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {

  isDeleted: boolean = false;
  form: FormGroup;
  isAdmin: boolean;
  username;
  firstname;
  lastname;
  about = "asdasdasddasdasdasasdasdadsa";
  url;
  songs = [];
  nrSongs = 42;
  gotSongs = false;
  phoneProfile = true;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private content: ContentService, private auth: AuthService, private router: Router) {

    this.route.params.subscribe(params => {
      //Creator trying to visit his profile while loggedin,
      //redirect him to his prof page
      if (params.creator == this.auth.getUsername) {
        // console.log(this.auth.getUsername,params.creator,this.auth.isLoggedIn);
        this.router.navigate(['profile']);
      } else {
        this.reload(params.creator);
      }
    });
  }

  reload(creator) {
    this.content.getCreatorDetails(creator).subscribe(data => {
      //If exists
      if (data) {
        //Set details
        this.songs = data.songs;
        this.isDeleted = false;
        this.gotSongs = true;
        this.url = "http://localhost:3131/rest/content/resource?p=" + data.slika;
        this.about = data.about;
        if(data.songs !=null){
          this.nrSongs = data.songs.length;
          this.gotSongs=false;
        }
        this.firstname = data.ime;
        this.lastname = data.prezime;
        this.username = creator;
        console.log(this.songs)
      } else {
        this.isDeleted = true;
      }
    });
  }

  ngOnInit() {
    if (this.auth.isAdmin) {
      this.isAdmin = true;
      console.log('admin is logged');
    }
    if (window.screen.width > 991) {
      this.phoneProfile = false;
      console.log(this.phoneProfile);
    }

    this.form = this.fb.group({
      confirmation: new FormControl("", Validators.required),
    });
  }

  remove() {
    console.log(this.username, 'to be deleted');
    this.auth.deleteCreator(this.username).subscribe(data => {
      console.log(data, 'data from srv delete');
      if (data.success) {
        this.router.navigate(['admin']);
      }
    })
  }

  matchValidator(event) {
    if (event.target.value == this.username) {
      this.form.controls['confirmation'].setErrors(null);
    } else {
      this.form.controls['confirmation'].setErrors({ 'invalid': true });
    }
  }

}
