import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { shareReplay } from 'rxjs/operators';
import { CrexinService } from 'src/app/services/crexin.service';
import { CheckoutService } from '../../services/checkout.service';
import { GlobalData } from '../../globaldata/global.data';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  loading = true;
  auth_token = localStorage.getItem('auth_token');
  ongoing: any;
  scheduled: any;
  completed: any;
  cancelled:any;
  pending:any;
  ongoing_array = [];
  scheduled_array = [];
  completed_array=[];
  cancelled_array=[];
  pending_array=[];
  type: any;
  noongoingitem:boolean;
  nopendingitem:boolean;
  noscheduleditem:boolean;
  nocompleteditem:boolean;
  nocancelleditem:boolean;
  isLinear = false;
  enddatetime:boolean;
  // hello="hello";
  // hi="hi";
  constructor(private checkoutservice:CheckoutService, private fb:FormBuilder, private toastr:ToastrService,private router:Router,private http:HttpClient,private activeroute:ActivatedRoute, private route:Router, private crexinservice:CrexinService) { }

  ngOnInit(): void {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    // this.http.get<any>('https://superuser.crexin.com/api/user/bookeditem/',{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
    //   console.log(res);
    // })
    this.http.get<any>(GlobalData.url_api+'user/myorders',{ 'headers': headers }).subscribe((res)=>{
      console.log(res);
      this.ongoing = res.ongoing;
      console.log(this.ongoing);
      for(var i=0;i<this.ongoing.length;i++){
        console.log(this.ongoing);
        if(this.ongoing[i].booking!=null){
          this.ongoing_array.push(this.ongoing[i]);
          console.log(this.ongoing_array);
        }
      }
      
      this.scheduled = res.scheduled;
      console.log(this.scheduled);
      for(var i=0;i<this.scheduled.length;i++){
        console.log(this.scheduled);
        if(this.scheduled[i].booking!=null){
          this.scheduled_array.push(this.scheduled[i]);
          console.log(this.scheduled_array);
          console.log(this.type);
        }
      }
      this.completed = res.completed
      console.log(this.completed);
      for(var i=0;i<this.completed.length;i++){
        if(this.completed[i].booking!=null){
          this.completed_array.push(this.completed[i]);
          console.log(this.completed_array);
        }
      }
      this.cancelled = res.cancelled
      console.log(this.cancelled);
      for(var i=0;i<this.cancelled.length;i++){
        if(this.cancelled[i].booking!=null){
          this.cancelled_array.push(this.cancelled[i]);
          console.log(this.cancelled_array);
        }
      }
      this.pending = res.pending
      console.log(this.pending);
      for(var i=0;i<this.pending.length;i++){
        if(this.pending[i].booking!=null){
          this.pending_array.push(this.pending[i]);
          console.log(this.pending_array);
        }
      }
      this.loading = false
      if(this.ongoing_array.length==0){
        this.noongoingitem = true;
      }
      if(this.pending_array.length==0){
        this.nopendingitem = true;
      }
      if(this.scheduled_array.length==0){
        this.noscheduleditem = true;
      }
      if(this.completed_array.length==0){
        this.nocompleteditem = true;
      }
      if(this.cancelled_array.length==0){
        this.nocompleteditem = true;
      }
    })
  }
  ongoing_singlebooking(type:any,booking_id:any,id:any){
    localStorage.setItem('booking_id', booking_id)
    localStorage.setItem('b_id', id)
    localStorage.setItem('type', type)
    this.type = type;
    console.log(this.type);
    if(this.type === 'hourly'){
       this.router.navigate(['hourlybookingstatus']);
    }
    else if(this.type === 'daily'){
      this.router.navigate(['dailybookingstatus']);
    }
    else if(this.type === 'weekly'){
      this.router.navigate(['weeklybookingstatus'])
    }
  }
  sheduled_singlebooking(type:any,booking_id:any,id:any){
    localStorage.setItem('booking_id', booking_id)
    localStorage.setItem('b_id', id)
    localStorage.setItem('type', type)
    this.type = type;
    console.log(this.type);
    if(this.type === 'hourly'){
       this.router.navigate(['hourlybookingstatus']);
    }
    else if(this.type === 'daily'){
      this.router.navigate(['dailybookingstatus']);
    }
    else if(this.type === 'weekly'){
      this.router.navigate(['weeklybookingstatus'])
    }
  }
  completed_singlebooking(type:any,booking_id:any,id:any){
    localStorage.setItem('booking_id', booking_id)
    localStorage.setItem('b_id', id)
    localStorage.setItem('type', type)
    this.type = type;
    console.log(this.type);
    if(this.type === 'hourly'){
       this.router.navigate(['hourlybookingstatus']);
    }
    else if(this.type === 'daily'){
      this.router.navigate(['dailybookingstatus']);
    }
    else if(this.type === 'weekly'){
      this.router.navigate(['weeklybookingstatus'])
    }
  }

  pending_singlebooking(type:any,booking_id:any,id:any){
    localStorage.setItem('booking_id', booking_id)
    localStorage.setItem('b_id', id)
    localStorage.setItem('type', type)
    this.type = type;
    console.log(this.type);
    if(this.type === 'hourly'){
       this.router.navigate(['hourlybookingstatus']);
    }
    else if(this.type === 'daily'){
      this.router.navigate(['dailybookingstatus']);
    }
    else if(this.type === 'weekly'){
      this.router.navigate(['weeklybookingstatus'])
    }
  }
}
