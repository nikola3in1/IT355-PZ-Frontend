import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UploaderService } from '../../_services/uploader.service';
import { ContentService } from '../../_services/content.service';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  form: FormGroup;

  uploaded=false;

  genres = [];

  song: File;
  watermarkedSong: File;
  songUploaded: boolean = false;
  wsongUploaded: boolean = false;
  songError: boolean = false;
  wsongError: boolean = false;
  fileName = "";
  fileName1 = "";

  constructor(private Auth: AuthService, private user: UserService, private fb: FormBuilder, private content: ContentService) {
    user.authPath("user","upload");
    this.content.getGenreList(-1).subscribe(genres=> {
      this.genres = genres;
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: new FormControl("", Validators.compose([Validators.required, Validators.minLength(5)])),
      genre: new FormControl("", Validators.required),
      song: new FormControl("", Validators.required),
      wsong: new FormControl("", Validators.required),
      about: new FormControl("", Validators.required)
    })
  }

  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      if (event.srcElement.id == "song") {
        this.song = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(this.song);
        reader.onloadend = (e) => {
          //uploaded successfully
          if (this.song.type.indexOf('audio') >= 0) {
            this.songUploaded = true;
            this.songError = false;
          } else {
            this.form.controls['song'].setErrors({ 'incorect': true });
            this.songError = true;
            this.songUploaded = false;
          }
          this.fileName = this.song.name;
        }
      } else if (event.srcElement.id == 'wsong') {
        this.watermarkedSong = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(this.watermarkedSong);
        reader.onloadend = (e) => {
          //uploaded successfully
          if (this.watermarkedSong.type.indexOf('audio') >= 0) {
            this.wsongUploaded = true;
            this.wsongError = false;
          } else {
            this.form.controls['wsong'].setErrors({ 'incorect': true });
            this.wsongError = true;
            this.wsongUploaded = false;
          }
          this.fileName1 = this.watermarkedSong.name;
        }
      }
    }
  }

  onUpload() {

    if (this.song && this.watermarkedSong) {
      const name = this.form.value['name'];
      const genre = this.form.value['genre'];
      const about = this.form.value['about'];

      const body = new FormData();
      body.append('name', name);
      body.append('genre', genre);
      body.append('about', about);
      body.append('song', this.song, this.song.name);
      body.append('wsong', this.watermarkedSong, this.watermarkedSong.name);

      console.log(body);

      this.Auth.uploadSong(body).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log(event, "progress");
        } else if (event.type === HttpEventType.Response) {
          console.log(event, "response");
          if (event.body.success) {
            //show msg
            this.uploaded=true;
          }
        }
      });

    }

    // if(this.picture){
    //   const about = this.form.value['about'];
    //   const paypal = this.form.value['paypal'];

    //   const body = new FormData();
    //   body.append('picture', this.picture, this.picture.name);
    //   body.append('about', about);
    //   body.append('paypal', paypal);

    //   this.Auth.editProfile(body).subscribe(event => {
    //     if (event.type === HttpEventType.UploadProgress) {
    //       console.log(event, "progress");
    //     } else if (event.type === HttpEventType.Response) {
    //       console.log(event, "response");
    //       if(event.body){
    //         console.log("Redirect?")
    //         this.router.navigate(["profile"]);
    //       }
    //     }
    //   });
    // }

  }
}
