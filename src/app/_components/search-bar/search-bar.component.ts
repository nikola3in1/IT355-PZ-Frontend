import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,private router:Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      input: new FormControl("", Validators.compose([Validators.required, Validators.minLength(3)])),
    });
  }


  search(){
    const query = this.form.value['input'];
    if(query.length>3){
      this.router.navigate(['/search',query]);
    }
  }
}
