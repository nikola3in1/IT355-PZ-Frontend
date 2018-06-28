import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private user: UserService, private Auth: AuthService, private fb: FormBuilder, private router: Router) {
   
  }

  get username() { return this.form.get('username'); }

  get password() { return this.form.get('password'); }

  onSubmit() {
    const username = this.form.value['username'];
    const password = this.form.value['password'];
    this.Auth.getUserDetails(username, password).subscribe((data) => {
      if (data.success) {
        this.user.auth().subscribe(type => {
          console.log(type,"type");
          if (type.message == "admin") {
            console.log("hoto");
            this.Auth.setIsAdmin(true);
            this.Auth.setLoggedIn(false);
            this.user.authPath(["admin"],null);
            this.router.navigate(["admin"]);
          } else if (type.message == "user") {
            this.Auth.setLoggedIn(true);
            this.Auth.setIsAdmin(false);
            this.user.authPath(["profile"],null);
            this.router.navigate(["profile"]);
          }
        });
      } else {
        window.alert(data.message);
      }
      console.log(data, "data from the server");
    });
  }

  ngOnInit() {
    console.log(this.Auth.isAdmin);
    if(this.Auth.isLoggedIn){
      this.router.navigate(['profile']);
    }else if(this.Auth.isAdmin){
      console.log('dasdasd');
      this.router.navigate(['admin']);
    }

    this.form = this.fb.group({
      username: new FormControl("", Validators.compose([Validators.required, Validators.minLength(5)])),
      password: new FormControl("", Validators.compose([Validators.required, Validators.minLength(8)]))
    });
    console.log(this.form);
  }

}
