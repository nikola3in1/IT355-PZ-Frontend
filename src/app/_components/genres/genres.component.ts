import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../_services/content.service';
@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  genreList = ["rnb","corporate","electronica",'classical','jazz','rock','pop','metal','djent','folk','dnb','country'];

  constructor(private content: ContentService ) { }

  ngOnInit() {
    this.content.getGenreList(12).subscribe(data=>{
      if(data){
        this.genreList=data;
      }
    });
  }

}
