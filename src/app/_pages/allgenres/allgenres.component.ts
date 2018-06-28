import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../_services/content.service';

@Component({
  selector: 'app-allgenres',
  templateUrl: './allgenres.component.html',
  styleUrls: ['./allgenres.component.scss']
})
export class AllgenresComponent implements OnInit {

  genreList=[];

  constructor(private content: ContentService) { }

  ngOnInit() {
    this.content.getGenreList(null).subscribe(data=>{
      if(data){
        this.genreList=data;
      }
    });
  }

}
