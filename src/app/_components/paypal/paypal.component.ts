import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ContentService } from '../../_services/content.service';

declare let paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {

  constructor(private fb: FormBuilder, private content: ContentService) { }
  form: FormGroup;
  @Input() name = "";
  @Input() creator = "";
  @Input() about = "";
  @Input() duration = "";
  @Input() nrSales;
  @Input() price;
  @Input() genre = "Rock";
  bought: boolean = false;
  ngOnInit() {
    this.form = this.fb.group({
      confirmation: new FormControl("", Validators.required),
    });
  }
  buy() {
    let paypalEmail =  (<HTMLInputElement>document.getElementById("paypalEmail")).value;
    this.content.buy(this.name, this.creator,paypalEmail).subscribe(data => {
      if (data.success) {
        this.bought = true;
        window.open("http://localhost:3131/download?k=" + data.k)
      }
    });
  }
}
