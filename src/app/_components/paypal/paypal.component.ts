import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ContentService } from '../../_services/content.service';

declare let paypal : any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit{

  constructor( private fb: FormBuilder, private content: ContentService) { }
  form: FormGroup;
  @Input() name = "";
  @Input() creator = "";
  @Input() about = "";
  @Input() duration = "";
  @Input() nrSales;
  @Input() price;
  @Input() genre = "Rock";
  bought:boolean=false;
  ngOnInit() {

    this.form = this.fb.group({
      confirmation: new FormControl("", Validators.required),
    });
  }
  buy(){
    this.content.buy(this.name,this.creator).subscribe(data=>{
      if(data.success){
        this.bought=true;
      }
    });
  }
}
