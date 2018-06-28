import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() isSticky:boolean;
  public style={'position':'fixed', 'width': '100%'};
  constructor() {
  }

  ngOnInit() {
    if(!this.isSticky){
      this.style=null;
    }
  }

}
