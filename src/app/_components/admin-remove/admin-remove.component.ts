import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators} from '@angular/forms';
import { ContentService } from '../../_services/content.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-admin-remove',
  templateUrl: './admin-remove.component.html',
  styleUrls: ['./admin-remove.component.scss']
})
export class AdminRemoveComponent implements OnInit {

  form:FormGroup;
  removed:boolean=false;
  genres=[];

  constructor(private fb : FormBuilder, private content: ContentService, private Auth: AuthService) { 
    this.loadGenres();
  }

  loadGenres(){
    this.content.getGenres().subscribe(data => {
      this.genres = data.genres;
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      genre: new FormControl("",Validators.required),
    });
  }
  onSubmit(){
    const genre = this.form.value['genre'];
    this.Auth.removeGenre(genre).subscribe(data=>{
      if(data.success){
        this.removed=true;
        this.loadGenres();
      }
    });
  }


}
