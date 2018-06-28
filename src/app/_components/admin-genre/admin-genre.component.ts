import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-admin-genre',
  templateUrl: './admin-genre.component.html',
  styleUrls: ['./admin-genre.component.scss']
})
export class AdminGenreComponent implements OnInit {

  status:boolean=false;
  
  form: FormGroup;

  constructor(private fb: FormBuilder,private Auth: AuthService) { }


  ngOnInit() {
    this.form = this.fb.group({
      name: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3)])),
      about: new FormControl("", Validators.compose([Validators.required, Validators.minLength(15)])),
    });
  }

  onSubmit(){
    const name = this.form.value['name'];
    const about = this.form.value['about'];
    this.Auth.addGenre(name,about).subscribe(data=>{
      if(data.success){
        this.status=true;
      }
    });
  }

}
