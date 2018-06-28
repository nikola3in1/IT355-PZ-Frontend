import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../../_services/content.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {

  isDeleted: boolean = false;

  songName = "";
  creator = "";
  about = "";
  duration = "";
  nrSales;
  price;
  genre = "Rock";

  public songs = [];

  constructor(private route: ActivatedRoute, private content: ContentService, private router: Router) {
    this.route.params.subscribe(params => {
      this.content.getIp().then((data: any) => {
        this.content.getSong(params.creator, params.songName, data.ip).subscribe(data => {
          console.log(data, "song data");
          if (data) {
            this.songs[0] = data;
            this.songName = data.name;
            this.creator = data.creator;
            this.about = data.about;
            this.price = data.price;
            this.genre = data.genre;
            this.nrSales = data.sales;
            this.duration = this.calcDuration(data.duration);
          } else {
            this.isDeleted = true;
          }
        });
      });
    });
  }
  calcDuration(duration) {
    let raw= duration / 60+"";
    let split = raw.split('.');
    let minutes = split[0];
    let seconds = split[1][0]+""+split[1][1];
    return minutes+":"+seconds;
  }

  deleted() {
    //This will only happen when admin deletes song
    this.router.navigate(['admin']);
  }

  ngOnInit() {

  }


}
