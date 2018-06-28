import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  isCollapsed = true;
  textStyle={
    'width':"",
    'padding-top':"100px"
  }
  inputStyle={
    'width':"",
    'margin-left':""
  }
  constructor() { 
  }

  ngOnInit() {

    this.textStyle.width=window.screen.width+"px";
    // const inputSize= window.screen.width/10*6;
    // this.inputStyle.width=inputSize+"px";
    // this.inputStyle["margin-left"]=(window.screen.width-inputSize)/2-10+"px";
    // console.log(this.searchStyles.width,"width");
    if(window.screen.width <= 991){
      this.isCollapsed=false;
    }
    console.log(window.screen.width);
  }


}
