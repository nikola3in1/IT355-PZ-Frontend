import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AbstractControl, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  re = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private fb: FormBuilder,private Auth: AuthService,private router: Router) {
  }   
  ngOnInit() {
    this.form = this.fb.group({
      username: new FormControl("", Validators.compose([Validators.required, Validators.minLength(5)])),
      email: new FormControl("", Validators.compose([Validators.required, Validators.pattern(this.re)])),
      password: new FormControl("", Validators.compose([Validators.required,Validators.minLength(8)])),
      rptpassword: new FormControl("", Validators.compose([Validators.required])),
      fname: new FormControl("", Validators.compose([Validators.required,Validators.minLength(2)])),
      lname: new FormControl("", Validators.compose([Validators.required,Validators.minLength(2)]))
    },{validator: this.pwdMatchValidator});
  }

  pwdMatchValidator(frm: FormGroup) {
    return frm.get('password').value === frm.get('rptpassword').value
       ? null : {'mismatch': true};
 }

  onSubmit() {
    const username = this.form.value['username'];
    const password = this.form.value['password'];
    const email = this.form.value['email'];
    const firstname = this.form.value['fname'];
    const lastname = this.form.value['lname'];
    this.Auth.signUp(username,password,email,firstname,lastname).subscribe(data=>{
      console.log(data);

      if(data.success){
        console.log("reditect?")
        this.router.navigate(['login']);
      }
    });
  }
}
