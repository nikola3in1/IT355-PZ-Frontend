import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss']
})

export class AdminReportComponent implements OnInit {


  reports=[];

  constructor(private Auth: AuthService, private router: Router) { 
  }

  
  ngOnInit() {
    this.loadReports();
  }

  loadReports(){
    this.Auth.getReports().subscribe(data=>{
      console.log(data);
      if(data.reports){
        this.reports=data.reports;
      }
    });
  }

  open(creator,song){
    this.router.navigate(['/creator',creator,song]);
  }

  deleteReport(id){
    this.Auth.deleteReport(id).subscribe(data=>{
      console.log(data)
      if(data.success){
        this.loadReports();
      }
    });
  }

}
