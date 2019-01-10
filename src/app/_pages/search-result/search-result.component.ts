import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../_services/content.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  creators = [];
  songs = [];
  gotCreators: boolean = false;
  gotSongs: boolean = false;

  constructor(private route: ActivatedRoute, private content: ContentService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params, ' ovde');
      this.songs = [];
      this.creators = [];
      this.content.search(params.query).subscribe(data => {
        console.log(data, 'search data');
        if (data.creators.length > 0) {
          this.creators = data.creators;
          this.gotCreators = true;
        }
        if (data.songs.length > 0) {
          this.songs = data.songs;
          this.gotSongs = true;
        }
        if (this.creators.length == 0 && this.songs.length == 0) {
          this.gotSongs = false;
          this.gotCreators = false;
        }
      });
    });
  }


}
