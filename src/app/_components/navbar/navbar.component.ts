import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  form: FormGroup;

  @Input() needSearch: boolean;
  isCollapsed = false;
  isLogged: boolean = false;
  isAdmin:boolean = false;
  searchStyle = {
    'width': "",
  }
  inputStyle = {
    'width': "",
    'margin': "0px"
  }
  buttonStyle = {
    'width': '',
    'margin-top': "6px",
    'margin-left': '0px',
    'margin-right': '0px'
  }
  constructor(private Auth: AuthService,private fb: FormBuilder, private router: Router) {
    this.isLogged = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    console.log(this.isAdmin,this.isLogged,"adas");
  }

  ngOnInit() {
    if (window.screen.width <= 991 && this.needSearch) {
      this.searchStyle.width = window.screen.width + "px";
      this.inputStyle.width = window.screen.width / 10 * 7 + "px";
      // this.buttonStyle.width=window.screen.width/10*1+"px";
      this.isCollapsed = true;
    }
    this.form = this.fb.group({
      input: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3)])),
    });
    console.log(window.screen.width);
  }
  search(){
    const query = this.form.value['input'];
    if(query.length>3){
      this.router.navigate(['/search',query]);
    }
  }

}
