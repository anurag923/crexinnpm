import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { shareReplay } from 'rxjs/operators';
import { CrexinService } from 'src/app/services/crexin.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.css'],
  providers: [DatePipe]
})
export class SingleproductComponent implements OnInit {
  selectedIndex: number = null;
  hourly = true;
  daily = false;
  weekly = false;
  allcategories: any;
  cat_id: any;
  auth_token = localStorage.getItem('auth_token');
  singleproduct:any;
  message: string;
  products: any;
  Hourly:FormGroup;
  Daily:FormGroup;
  Weekly:FormGroup;
  submitted: boolean;
  selectedItem: any;
  submitted_hourly: boolean;
  submitted_daily: boolean;
  submitted_weekly: boolean;
  Hourly_button:boolean;
  Daily_button = false;
  Weekly_button = false;
  date: any;
  e_date: any;
  end_date = "";
  end_time = "";
  single_product = true;
  categorie_products:boolean;
  wend_date: string;
  wend_time: any;
  order: any;
  Date: Date;
  latest_date: string;
  book_date1: string;
  s_date: any;
  w_s_date: any;
  loading = true;
  no_of_weeks:any;
  cat_name = localStorage.getItem('cat_name');
  bookings_notavailable = false;
  show = false;
  error:any;
  index:number;
  no_of_hours:any;
  start_date:any;
  start_time:any;
  no_of_days:any;
  d_start_date:any;
  d_start_time:any;
  d_end_time:any;
  hourly_checked:boolean;
  daily_checked:boolean;
  weekly_checked:boolean;
  w_start_date:any;
  w_start_time:any;
  h_end_time:any;
  h_endplusone:any;
  category_name:any;
  constructor(private datePipe: DatePipe,private fb:FormBuilder, private toastr:ToastrService,private router:Router,private http:HttpClient,private activeroute:ActivatedRoute, private route:Router, private crexinservice:CrexinService) {
    // localStorage.setItem('time','hourly');
   }

  ngOnInit(): void {
    this.index = +localStorage.getItem('index'); 
    // localStorage.setItem('time','hourly');
    if(localStorage.getItem('time')=='hourly'){
      this.hourly_checked = true;
      this.daily_checked = false;
      this.weekly_checked = false;
      this.hourly = true;
      this.daily = false;
      this.weekly = false;
      this.Hourly_button = true;
      this.Daily_button = false;
      this.Weekly_button = false;
    }
    else if(localStorage.getItem('time')=='daily'){
      this.daily_checked = true;
      this.hourly_checked = false;
      this.weekly_checked = false;
      this.daily = true;
      this.hourly = false;
      this.weekly = false;
      this.Hourly_button = false;
      this.Daily_button = true;
      this.Weekly_button = false;
    }
    else if(localStorage.getItem('time')=='weekly'){
      this.weekly_checked = true;
      this.daily_checked = false;
      this.hourly_checked = false;
      this.weekly = true;
      this.daily = false;
      this.hourly = false;
      this.Hourly_button = false;
      this.Daily_button = false;
      this.Weekly_button = true;
    }
    else if(localStorage.getItem('time')==null){
      this.hourly_checked = true;
      this.daily_checked = false;
      this.weekly_checked = false;
      this.hourly = true;
      this.daily = false;
      this.weekly = false;
      this.Hourly_button = true;
      this.Daily_button = false;
      this.Weekly_button = false;
    }
    if(localStorage.getItem('time')=='hourly'){
      if(localStorage.getItem('no_hours')!=null){
        this.no_of_hours = localStorage.getItem('no_hours');
      }
      if(localStorage.getItem('h_startdate')!=null){
        this.start_date = localStorage.getItem('h_startdate');
      }
      if(localStorage.getItem('h_starttime')){
        this.start_time = localStorage.getItem('h_starttime');
      }
    }
    
    if(localStorage.getItem('time')=='daily'){
      if(localStorage.getItem('no_days')!=null){
        this.no_of_days = localStorage.getItem('no_days');
      }
      if(localStorage.getItem('d_starttime')!=null){
        this.d_start_time = localStorage.getItem('d_starttime');
      }
      if(localStorage.getItem('d_startdate')!=null){
        this.d_start_date = localStorage.getItem('d_startdate');
      }
      if(localStorage.getItem('d_endtime')!=null){
        this.end_time = localStorage.getItem('d_endtime');
      }
      if(localStorage.getItem('d_enddate')!=null){
        this.end_date = localStorage.getItem('d_enddate');
      }
    }

    if(localStorage.getItem('time')=='weekly'){
      if(localStorage.getItem('no_weeks')!=null){
        this.no_of_weeks = localStorage.getItem('no_weeks');
      }
      if(localStorage.getItem('w_startdate')!=null){
        this.w_start_date = localStorage.getItem('w_startdate');
      }
      if(localStorage.getItem('w_starttime')!=null){
        this.w_start_time = localStorage.getItem('w_starttime');
      }
      if(localStorage.getItem('w_endtime')!=null){
        this.wend_time = localStorage.getItem('w_endtime');
      }
      if(localStorage.getItem('w_enddate')!=null){
        this.wend_date = localStorage.getItem('w_enddate');
      }
    }

    if(localStorage.getItem('time')==null){
      if(localStorage.getItem('no_hours')!=null){
        this.no_of_hours = localStorage.getItem('no_hours');
      }
      if(localStorage.getItem('h_startdate')!=null){
        this.start_date = localStorage.getItem('h_startdate');
      }
      if(localStorage.getItem('h_starttime')){
        this.start_time = localStorage.getItem('h_starttime');
      }
    }
    //this.categoriedetails(this.index,localStorage.getItem('cat_id'),localStorage.getItem('cat_name'));
    // localStorage.setItem('time','hourly');
    this.Hourly = this.fb.group({
      no_hours : ['', Validators.required],
      h_startdate : ['', Validators.required],
      h_starttime : ['', Validators.required],
      });
      this.Daily = this.fb.group({
      no_days : ['', Validators.required],
      d_startdate : ['', Validators.required],
      d_starttime : ['', Validators.required],
      // d_enddate : ['', Validators.required],
      // d_endtime : ['', Validators.required],
      });
      this.Weekly = this.fb.group({
      no_weeks : ['', Validators.required],
      w_startdate : ['', Validators.required],
      w_starttime : ['', Validators.required],
      // w_enddate : ['', Validators.required],
      // w_endtime : ['', Validators.required]
    });
    this.crexinservice.getallcategories().subscribe((res)=>{
      console.log(res.categories);
      this.allcategories = res.categories
    });
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>('https://superuser.crexin.com/api/subcategory/'+localStorage.getItem('sub_id'),{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
     console.log(res);
    this.singleproduct = res.response;
    
     this.loading = false;
   },(error)=>{
     console.log(error);
    this.toastr.error(this.message,error.error.error,{
      
    });
   })
  }
  get h(){
  return this.Hourly.controls
  }
  get d(){
    return this.Daily.controls
  }
  get w(){
    return this.Weekly.controls
  }
  enddata(startdate){
      console.log(startdate);
      this.s_date = startdate;
      var str  = this.Daily.get('no_days').value 
      console.log(str);
      // var firstchar = str.charAt(0);
      var no_days = +str;
      this.date = new Date(startdate);
      var start_date = this.datePipe.transform(this.date,'dd/MM/yyyy');
      console.log(start_date);
      this.e_date =  this.date.setDate(this.date.getDate() + no_days);
      this.end_date = this.datePipe.transform(this.e_date,'yyyy-MM-dd');
      console.log(this.end_date);
  }
  d_days(){
    var str  = this.Daily.get('no_days').value 
    console.log(str);
    // var firstchar = str.charAt(0);
    var no_days = +str;
    this.date = new Date(this.s_date);
    var start_date = this.datePipe.transform(this.date,'dd/MM/yyyy');
    console.log(start_date);
    this.e_date =  this.date.setDate(this.date.getDate() + no_days);
    this.end_date = this.datePipe.transform(this.e_date,'yyyy-MM-dd');
    console.log(this.end_date);
  }
  endtime(starttime){
    this.end_time = starttime;
    console.log(this.end_time);
  }
  w_end_date(startdate){
    console.log(startdate);
    this.w_s_date = startdate;
    var str  = this.Weekly.get('no_weeks').value 
    console.log(str);
    var no_weeks = str*7;
    console.log(no_weeks);
    this.date = new Date(startdate);
    var start_date = this.datePipe.transform(this.date,'dd/MM/yyyy');
    console.log(start_date);
    this.e_date =  this.date.setDate(this.date.getDate() + no_weeks);
    this.wend_date = this.datePipe.transform(this.e_date,'yyyy-MM-dd');
    console.log(this.wend_date);
  }
  w_end_time(starttime){
    this.wend_time = starttime;
    console.log(this.end_time);
  }
  w_days(){
    var str  = this.Weekly.get('no_weeks').value 
    console.log(str);
    var no_weeks = str*7;
    console.log(no_weeks);
    this.date = new Date(this.w_s_date);
    var start_date = this.datePipe.transform(this.date,'dd/MM/yyyy');
    console.log(start_date);
    this.e_date =  this.date.setDate(this.date.getDate() + no_weeks);
    this.wend_date = this.datePipe.transform(this.e_date,'yyyy-MM-dd');
    console.log(this.wend_date);
  }
  hourly_function(){
    localStorage.setItem('time','hourly');
    this.hourly_checked = true;
    this.daily_checked = false;
    this.weekly_checked = false;
    this.hourly = true;
    this.daily = false;
    this.weekly = false;
    this.Hourly_button = true;
    this.Daily_button = false;
    this.Weekly_button = false;
  }
  daily_function(){
    localStorage.setItem('time','daily');
    this.hourly_checked = false;
    this.daily_checked = true;
    this.weekly_checked = false;
    this.daily = true;
    this.hourly = false
    this.weekly = false;
    this.Hourly_button = false;
    this.Daily_button = true;
    this.Weekly_button = false;
  }
  weekly_function(){
    localStorage.setItem('time','weekly');
    this.hourly_checked = false;
    this.daily_checked = false;
    this.weekly_checked = true;
    this.weekly = true;
    this.daily = false;
    this.hourly = false;
    this.Hourly_button = false;
    this.Daily_button = false;
    this.Weekly_button = true;
  }
  categoriedetails(index:number,cat_id:any,categorie){
    this.category_name = categorie.c_name;
    localStorage.setItem('categoryclick','true')
    if(localStorage.getItem('categoryclick')=='true'){
      if(localStorage.getItem('time')==null){
        localStorage.removeItem('no_hours');
        localStorage.removeItem('h_startdate');
        localStorage.removeItem('h_starttime');
        this.no_of_hours = "";
        this.start_date = "";
        this.start_time = "";
        }
      else if(localStorage.getItem('time')=='hourly'){
        localStorage.removeItem('no_hours');
        localStorage.removeItem('h_startdate');
        localStorage.removeItem('h_starttime');
        localStorage.removeItem('time');
        this.no_of_hours = "";
        this.start_date = "";
        this.start_time = "";
      }
      else if(localStorage.getItem('time')=='daily'){
        localStorage.removeItem('no_days');
        localStorage.removeItem('d_starttime');
        localStorage.removeItem('d_startdate');
        localStorage.removeItem('d_endtime');
        localStorage.removeItem('d_enddate');
        localStorage.removeItem('time');
        this.no_of_days = "";
        this.d_start_date = "";
        this.d_start_time = "";
        this.end_date = "";
        this.end_time = "";
      }

      else if(localStorage.getItem('time')=='weekly'){
        localStorage.removeItem('no_weeks');
        localStorage.removeItem('w_starttime');
        localStorage.removeItem('w_startdate');
        localStorage.removeItem('w_endtime');
        localStorage.removeItem('w_enddate');
        localStorage.removeItem('time');
        this.no_of_weeks = "";
        this.w_start_time = "";
        this.w_start_date = "";
        this.wend_date = "";
        this.wend_time = "";
      }
    }
    this.selectedIndex = index;
    this.selectedItem = categorie.c_name;
    localStorage.setItem('cat_id',cat_id);
    localStorage.setItem('index',index.toString());
    localStorage.setItem('cat_name',categorie.c_name);
    this.cat_id = cat_id;
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>('https://www.superuser.crexin.com/api/subcategories/'+this.cat_id,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
    console.log(res);
    //this.route.navigate(['/rent/subcategories']);
    // this.singleproduct = res.response;
     if(res.subcategories.length === 0 || res.subcategories.length === null){
      this.toastr.error(this.message,"No equipments available at this moment",{
        
      });
     }
    else{
      this.products = res.subcategories
      this.loading = false;
    }
     this.loading = false;
   },(error)=>{
     console.log(error);
    this.toastr.error(this.message,error.error.error,{
      
    });
   });
   this.single_product = false;
   this.categorie_products = true;
  }
  singlesucategorie(id:any){
    localStorage.setItem('sub_id', id);
    console.log(localStorage.getItem('sub_id'));
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>('https://superuser.crexin.com/api/subcategory/'+localStorage.getItem('sub_id'),{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
      console.log(res);
      // localStorage.setItem('eqid',res.equipments[0].id);
      // console.log(localStorage.getItem('eqid'));
      if(res.response.length === 0 || res.response.length === null){
        this.toastr.error(this.message,"No equipments available at this moment",{
          
        });
       }
      else{
        this.singleproduct = res.response;
      }
      this.loading = false;
    });
    this.single_product = true;
    this.categorie_products = false;
  }
  // Equipmentlist(id:any){
  //   this.crexinservice.equipmentlist(id).subscribe((res)=>{
  //     console.log(res);
  //   })
  // }
  Hourlyoption(id:any){
    localStorage.setItem('rentclicked','true');
    console.log(id);
    localStorage.setItem('sub_id',id);
    this.submitted_hourly = true; 
    // alert((this.Hourly.get('h_starttime').value).charAt(6));
    var end = +(this.Hourly.get('h_starttime').value).charAt(6);
    var end5 = +(this.Hourly.get('h_starttime').value).charAt(5);
    var end0 = +(this.Hourly.get('h_starttime').value).charAt(0);
    var end8 = this.Hourly.get('h_starttime').value.charAt(8);
    var addhrs = +(this.Hourly.get('no_hours').value);
    var sum = end+addhrs;
    const hours = ["3","4","5","6","7","8","9"];
    if(end>=1 && end<=9 && this.Hourly.get('h_starttime').value.charAt(0)=="0"){
      this.h_end_time = end+addhrs;
      this.h_endplusone = this.h_end_time+1;
      var x = this.h_end_time+" "+"-"+" "+this.h_endplusone;
      console.log(x);
      console.log(x.charAt(5));
      
      if(hours.includes(x.charAt(1))&&(hours.includes(x.charAt(6)))){
        var changetonum1 = +x.charAt(1);
        var sub1 = (changetonum1-2);
        var changetostring1 = sub1.toString();
        var changetonum6 = +x.charAt(6);
        var sub6 = (changetonum6-2);
        var changetostring6 = sub6.toString();
        console.log(changetostring6);
        if(end8 == "A"&&sum<12){
          console.log("0"+changetostring1+" "+"-"+" "+"0"+changetostring6+" "+"AM");
        }
        else{
          console.log("0"+changetostring1+" "+"-"+" "+"0"+changetostring6+" "+"PM");
        }
      }
      else if(hours.includes(x.charAt(6))){
        var changetonum = +x.charAt(6);
        var sub = (changetonum-2);
        var changetostring = sub.toString();
        console.log(changetostring);
        if(end8 == "A"&&sum<12){
          console.log(this.h_end_time+" "+"-"+" "+"0"+changetostring+" "+"AM");
        }
        else{
          console.log(this.h_end_time+" "+"-"+" "+"0"+changetostring+" "+"PM");
        }
        
      }
      
      else if((x.charAt(0)=="1" && x.charAt(5)=="1")){
        if(end8 == "A"&&sum<12&&x.charAt(6)=="2"){
          console.log(this.h_end_time+" "+"-"+" "+this.h_endplusone+" "+"PM");
        }
        else if(end8 == "A"&&sum<12){
          console.log(this.h_end_time+" "+"-"+" "+this.h_endplusone+" "+"AM");
        }
        else{
          console.log(this.h_end_time+" "+"-"+" "+this.h_endplusone+" "+"PM");
        }
      }
      else if (x.charAt(4)=="1"){
        if(end8 == "A"&&sum<12){
          console.log("0"+this.h_end_time+" "+"-"+" "+this.h_endplusone+" "+"AM");
        }
        else{
          console.log("0"+this.h_end_time+" "+"-"+" "+this.h_endplusone+" "+"PM");
        }
      }
      else{
        if(end8 == "A"&&sum<12){
          console.log("0"+this.h_end_time+" "+"-"+" "+"0"+this.h_endplusone+" "+"AM");
        }
        else{
          console.log("0"+this.h_end_time+" "+"-"+" "+"0"+this.h_endplusone+" "+"PM");
        }
        
      }
     }
     else if(end0==1&&end5==1){
      var end5tostr = end5.toString();
      var endtostr = end.toString();
      var combine = end5tostr + endtostr;
      var combinetonum = +combine
      var addone = combinetonum+addhrs;
      var addoneplusone = addone+1;
      var addonetostring = addone.toString();
      var addoneplusonetostring = addoneplusone.toString();
      if(hours.includes(addonetostring.charAt(1))&&hours.includes(addoneplusonetostring.charAt(1))){
        var tonum = +(addonetostring.charAt(1));
        var tonum1 = +(addoneplusonetostring.charAt(1));
        var subtonum = tonum-2;
        var subtonum1 = tonum1-2;
        var subtonumtostring = subtonum.toString();
        var subtonumtostring1 = subtonum1.toString();
        if(end8 == "A"){
          console.log("0"+subtonumtostring+" "+"-"+" "+"0"+subtonumtostring1+" "+"PM");
        }
        else{
          console.log("0"+subtonumtostring+" "+"-"+" "+"0"+subtonumtostring1+" "+"AM");
        }
      }
      console.log(addone);
    }
     else if(end5==1){
       var end5tostr = end5.toString();
       var endtostr = end.toString();
       var combine = end5tostr + endtostr;
       var combinetonum = +combine
       var addone = combinetonum+addhrs;
       var addoneplusone = addone+1;
       var addonetostring = addone.toString();
       var addoneplusonetostring = addoneplusone.toString();
       if(hours.includes(addonetostring.charAt(1))&&hours.includes(addoneplusonetostring.charAt(1))){
         var tonum = +(addonetostring.charAt(1));
         var tonum1 = +(addoneplusonetostring.charAt(1));
         var subtonum = tonum-2;
         var subtonum1 = tonum1-2;
         var subtonumtostring = subtonum.toString();
         var subtonumtostring1 = subtonum1.toString();
         if(end8 == "A"){
          console.log("0"+subtonumtostring+" "+"-"+" "+"0"+subtonumtostring1+" "+"PM");
        }
        else{
          console.log("0"+subtonumtostring+" "+"-"+" "+"0"+subtonumtostring1+" "+"AM");
        }
         
       }
       console.log(addone);
     }
    // return;
    if(this.Hourly.invalid){
      return false;
    }
    else if(localStorage.getItem('auth_token') === null){
      localStorage.setItem('route',this.route.url);
      localStorage.setItem('no_hours',this.Hourly.get('no_hours').value);
      localStorage.setItem('h_startdate',this.Hourly.get('h_startdate').value);
      localStorage.setItem('h_starttime',this.Hourly.get('h_starttime').value);
      this.toastr.error(this.message,'Please login to proceed',{
        
      });
      this.router.navigate(['/login']);
    }
    else{
      console.log(localStorage.getItem('sub_id'));
      const data = {
        subcategory_id:localStorage.getItem('sub_id'),
        // userid:localStorage.getItem('user_id'),
        type:'hourly',
        duration:this.Hourly.get('no_hours').value,
        start_time:this.Hourly.get('h_starttime').value,
        start_date:this.Hourly.get('h_startdate').value,
      }
      localStorage.setItem('no_hours',this.Hourly.get('no_hours').value);
      localStorage.setItem('h_startdate',this.Hourly.get('h_startdate').value);
      localStorage.setItem('h_starttime',this.Hourly.get('h_starttime').value);
      console.log(data);
      console.log(this.auth_token);
      const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization',`Bearer ${this.auth_token}`);
      this.http.post<any>('https://superuser.crexin.com/api/user/rent',data,{'headers':headers}).subscribe((res)=>{
      //  console.log(res);
      // this.crexinservice.rent(data).subscribe((res)=>{
        console.log(res.response);
        localStorage.setItem('booking_id',res.response.id);
        console.log(res.response.subcategory.hourly_rate);
        localStorage.setItem('hourly_rate',res.response.subcategory.hourly_rate);
      //  localStorage.setItem('grandtotal', this.order.grandtotal);
      //  localStorage.setItem('gst', this.order.gst);
      //  localStorage.setItem('subtotal', this.order.subtotal);
      //  this.toastr.success(this.message,res.message,{
      //   
      // });
      this.router.navigate(['rent/check-out']);
     },(error)=>{
       console.log(error);
       if(error.error.message=='Bookings are allowed between 6AM to 9PM'){
         this.error = error.error.message;
         this.show = true;
         setTimeout(() => {
           this.show = false;
         }, 5000);
       }
      // this.toastr.error(this.message,error.error.message,{
      //   
      // });
      this.router.navigate(['singleproduct']);
     });
    }
  }
  Dailyoption(id:any){
    localStorage.setItem('sub_id',id);
    localStorage.setItem('rentclicked','true');
    
    this.submitted_daily = true;
    if(this.Daily.invalid){
      console.log(this.Daily.get('d_endtime').value);
      console.log(this.Daily.get('d_enddate').value);
      return false;
    }
    else if(localStorage.getItem('auth_token') === null){
      localStorage.setItem('route',this.route.url);
      localStorage.setItem('no_days',this.Daily.get('no_days').value);
      localStorage.setItem('d_starttime',this.Daily.get('d_starttime').value);
      localStorage.setItem('d_startdate',this.Daily.get('d_startdate').value);
      localStorage.setItem('d_endtime',this.end_time);
      localStorage.setItem('d_enddate',this.end_date);

      this.toastr.error(this.message,'Please login to proceed',{
        
      });
      this.router.navigate(['/login']);
    }
    else{
      const data = {
        subcategory_id:localStorage.getItem('sub_id'),
        // userid:localStorage.getItem('user_id'),
        type:'daily',
        duration :this.Daily.get('no_days').value,
        start_time:this.Daily.get('d_starttime').value,
        end_time:this.end_time,
        start_date:this.Daily.get('d_startdate').value,
        end_date:this.end_date,
      }
      localStorage.setItem('no_days',this.Daily.get('no_days').value);
      localStorage.setItem('d_starttime',this.Daily.get('d_starttime').value);
      localStorage.setItem('d_startdate',this.Daily.get('d_startdate').value);
      localStorage.setItem('d_endtime',this.end_time);
      localStorage.setItem('d_enddate',this.end_date);
      console.log(data);
      // this.crexinservice.rent(data).subscribe((res)=>{
        const headers= new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization',`Bearer ${this.auth_token}`);
        this.http.post<any>('https://www.superuser.crexin.com/api/user/rent',data,{'headers':headers}).subscribe((res)=>{
        console.log(res);
        localStorage.setItem('booking_id',res.response.id);
        localStorage.setItem('daily_rate',res.response.subcategory.daily_rate);
        // this.toastr.success(this.message,res.message,{
        //   
        // });
        //this.router.navigate(['checkout']);
        this.router.navigate(['rent/check-out']);
      },(error)=>{
        console.log(error);
        if(error.error.message=='Bookings are allowed between 6AM to 9PM'){
          this.error = error.error.message;
          this.show = true;
          setTimeout(() => {
            this.show = false;
          }, 5000);
        }
        // this.toastr.error(this.message,error.error.message,{
        //   
        // });
        this.router.navigate(['singleproduct']);
      })
    //   const headers= new HttpHeaders()
    //   .set('content-type', 'application/json')
    //   .set('Access-Control-Allow-Origin', '*')
    //   .set('Authorization',`Bearer ${this.auth_token}`);
    //   this.http.post<any>('https://www.superuser.crexin.com/api/rent',data,{'headers':headers}).subscribe((res)=>{
    //    console.log(res);
    //    this.order = res.data;
    //    localStorage.setItem('grandtotal', this.order.grandtotal);
    //    localStorage.setItem('gst', this.order.gst);
    //    localStorage.setItem('subtotal', this.order.subtotal);
    //    this.toastr.success(this.message,res.success,{
    //     
    //   });
    //   this.router.navigate(['checkout']);
    //  },(error)=>{
    //    console.log(error);
    //   this.toastr.error(this.message,error.error.message,{
    //     
    //   });
    //   this.router.navigate(['singleproduct']);
    //  })
    }
  }
  Weeklyoption(id:any){
    localStorage.setItem('sub_id',id);
    localStorage.setItem('rentclicked','true');

    this.submitted_weekly = true;
    if(this.Weekly.invalid){
      return false;
    }
    else if(localStorage.getItem('auth_token') === null){
      localStorage.setItem('route',this.route.url);
      localStorage.setItem('no_weeks',this.Weekly.get('no_weeks').value);
      localStorage.setItem('w_starttime',this.Weekly.get('w_starttime').value);
      localStorage.setItem('w_startdate',this.Weekly.get('w_startdate').value);
      localStorage.setItem('w_endtime',this.wend_time);
      localStorage.setItem('w_enddate',this.wend_date);

      this.toastr.error(this.message,'Please login to proceed',{
        
      });
      this.router.navigate(['/login']);
    }
    else{
      console.log(this.Weekly.get('no_weeks').value);
      const data = {
        subcategory_id:localStorage.getItem('sub_id'),
        // userid:localStorage.getItem('user_id'),
        type:'weekly',
        duration:this.no_of_weeks,
        start_time:this.Weekly.get('w_starttime').value,
        end_time:this.wend_time,
        start_date:this.Weekly.get('w_startdate').value,
        end_date:this.wend_date,
      }
      localStorage.setItem('no_weeks',this.Weekly.get('no_weeks').value);
      localStorage.setItem('w_starttime',this.Weekly.get('w_starttime').value);
      localStorage.setItem('w_startdate',this.Weekly.get('w_startdate').value);
      localStorage.setItem('w_endtime',this.wend_time);
      localStorage.setItem('w_enddate',this.wend_date);
      console.log(data);
      //this.crexinservice.rent(data).subscribe((res)=>{
        const headers= new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization',`Bearer ${this.auth_token}`);
        this.http.post<any>('https://www.superuser.crexin.com/api/user/rent',data,{'headers':headers}).subscribe((res)=>{
        console.log(res);
        localStorage.setItem('booking_id',res.response.id);
        localStorage.setItem('weekly_rate',res.response.subcategory.weekly_rate);
        // this.toastr.success(this.message,res.message,{
        //   
        // });
        //this.router.navigate(['checkout']);
        this.router.navigate(['rent/check-out']);
      },(error)=>{
        console.log(error);
        if(error.error.message=='Bookings are allowed between 6AM to 9PM'){
          this.error = error.error.message;
          this.show = true;
          setTimeout(() => {
            this.show = false;
          }, 5000);
        }
      //  this.toastr.error(this.message,error.error.message,{
      //    
      //  });
       this.router.navigate(['singleproduct']);
      })
    //   const headers= new HttpHeaders()
    //   .set('content-type', 'application/json')
    //   .set('Access-Control-Allow-Origin', '*')
    //   .set('Authorization',`Bearer ${this.auth_token}`);
    //   this.http.post<any>('https://www.superuser.crexin.com/api/rent',data,{'headers':headers}).subscribe((res)=>{
    //    console.log(res);
    //    this.order = res.data;
    //    localStorage.setItem('grandtotal', this.order.grandtotal);
    //    localStorage.setItem('gst', this.order.gst);
    //    localStorage.setItem('subtotal', this.order.subtotal);
    //    this.toastr.success(this.message,res.success,{
    //     
    //   });
    //   this.router.navigate(['checkout']);
    //  },(error)=>{
    //    console.log(error);
    //   this.toastr.error(this.message,error.error.error,{
    //     
    //   });
    //   this.router.navigate(['singleproduct']);
    //  })
    }
  }
  getcurrentdate() {
    this.Date = new Date();
    var time = this.datePipe.transform(this.Date, 'HH:MM');
    if(time<"18:00"){
      this.Date.setDate(this.Date.getDate()+1);
      this.latest_date = this.datePipe.transform(this.Date, 'yyyy-MM-dd');
      this.book_date1 = this.latest_date;
    }
    else if(time>="18:00"){
      this.Date.setDate(this.Date.getDate()+2);
      this.latest_date = this.datePipe.transform(this.Date, 'yyyy-MM-dd');
      this.book_date1 = this.latest_date;
    }
  }
  search(search_categorie){
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>(`https://www.superuser.crexin.com/api/searchequipments?subcategoryid=${localStorage.getItem('p_id')}&equipment=${search_categorie}`,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
      console.log(res.equipments);
      // console.log(res.category);
      // console.log(res.products);
      this.singleproduct = res.equipments;
      // this.products = res.products;
    })
  }
  categories(){
    this.router.navigate(['/rent']);
  }
  
  s(){
    this.bookings_notavailable = true;
    setTimeout(function(){
      this.bookings_notavailable = false;
    },3000);
  }
}
