import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../_services/content.service';

@Component({
  selector: 'app-topfive',
  templateUrl: './topfive.component.html',
  styleUrls: ['./topfive.component.scss']
})
export class TopfiveComponent implements OnInit {

  songs = []

  constructor(private content: ContentService) { }

  ngOnInit() {
    // this.content.getIp().then((data: any) => {
      //Uzimamo zanrove
      this.content.getTop5().subscribe(data => {
        this.songs = data.songs;
        console.log(data,"songs");
      });
    // });
  }

}
