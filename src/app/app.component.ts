import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crexin';
  ngOnInit(){
    console.log('2021-06-04');
    window.onload=()=>{
      if(localStorage.getItem('time')==null){
        localStorage.removeItem('no_hours');
        localStorage.removeItem('h_startdate');
        localStorage.removeItem('h_starttime');
        }
      else if(localStorage.getItem('time')=='hourly'){
        localStorage.removeItem('no_hours');
        localStorage.removeItem('h_startdate');
        localStorage.removeItem('h_starttime');
        localStorage.removeItem('time');
      }
      else if(localStorage.getItem('time')=='daily'){
        localStorage.removeItem('no_days');
        localStorage.removeItem('d_starttime');
        localStorage.removeItem('d_startdate');
        localStorage.removeItem('d_endtime');
        localStorage.removeItem('d_enddate');
        localStorage.removeItem('time');
      }

      else if(localStorage.getItem('time')=='weekly'){
        localStorage.removeItem('no_weeks');
        localStorage.removeItem('w_starttime');
        localStorage.removeItem('w_startdate');
        localStorage.removeItem('w_endtime');
        localStorage.removeItem('w_enddate');
        localStorage.removeItem('time');
      }
    }
  }
}
