import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  public form: FormGroup;
  public picture: File;
  public url = "https://img.freepik.com/free-photo/man-smiling-with-arms-crossed_1187-2903.jpg?size=338&ext=jpg";

  constructor(fb: FormBuilder, private router: Router, private http: HttpClient, private Auth: AuthService) {
    this.form = fb.group({
      about: ["", null],
      paypal: ["", Validators.email],
      picture: ["",Validators.required]
    });
  }

  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      this.picture = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.picture);
      reader.onloadend = (e) => {
        this.url = reader.result;
      }
    }
  }

  //Napravi service
  onUpload() {

    if(this.picture){
      const about = this.form.value['about'];
      const paypal = this.form.value['paypal'];
  
      const body = new FormData();
      body.append('picture', this.picture, this.picture.name);
      body.append('about', about);
      body.append('paypal', paypal);
  
      this.Auth.editProfile(body).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log(event, "progress");
        } else if (event.type === HttpEventType.Response) {
          console.log(event, "response");
          if(event.body){
            console.log("Redirect?")
            this.router.navigate(["profile"]);
          }
        }
      });
    }
    
  }

  ngOnInit() {
  }

}
