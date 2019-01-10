import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../_services/content.service';
declare var WaveSurfer: any;


@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  gotSongs:boolean=false;
  @Input('genreName')genreName:string;
  constructor(private route: ActivatedRoute,private content: ContentService) { 
  }
  songs =[]

  ngOnInit() {
    //Uzimamo parametre iz rute
    this.route.params.subscribe(params =>{
      //Uzimamo ip korisnika
      // this.content.getIp().then((data:any)=>{
        //Uzimamo zanrove
        this.content.getByGenre(params.genre).subscribe(data=>{
          console.log(params.genre,data)
          if(data.songs.length>0){
            this.songs=data.songs;
            this.gotSongs=true;
          }
        });
      // });
      this.genreName=params.genre;
    });
  }

}
