import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { shareReplay } from 'rxjs/operators';
import { CrexinService } from 'src/app/services/crexin.service';
import { WindowRefService } from 'src/app/window-ref.service';
declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  selectedIndex: number = null;
  c_unactive = false;
  c_active = true;
  cat_id: any;
  auth_token = localStorage.getItem('auth_token');
  allcategories: any;
  message: any;
  loading = true;
  products: any;
  firstcategorie = true;
  firstcategoriedatas: any;
  selectedItem: any;
  searchcategories: any;
  categories = true;
  globalsearch :boolean;
  searchval:any;
  allcat = true;
  searchcat = false;
  constructor(private spinner: NgxSpinnerService,private toastr:ToastrService,private router:Router,private http:HttpClient,private activeroute:ActivatedRoute, private route:Router, private crexinservice:CrexinService) { }

  ngOnInit(): void {
    if(localStorage.getItem('global_search')=='true'){
      this.searchcat = true;
      this.allcat = false;
      this.searchval = localStorage.getItem('search_categorie');
    }
    
    document.getElementById("gsearch").addEventListener("search", function(event) {
      window.location.reload();
    });
    $(document).ready(function () {
      $(".input").focusin(function () {
        $(".close-btn").addClass("active");
      });

      $(".input").focusout(function () {
        $(".close-btn").removeClass('active');
        $(this).val("");
      });
    })
  if(localStorage.getItem('global_search') === 'true'){
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>('https://superuser.crexin.com/api/searchcategories?category='+localStorage.getItem('search_categorie'),{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
      console.log(res.categories);
      localStorage.setItem('global_search', 'false');
      if(res.categories.length === 0){
         this.toastr.error(this.message,'No data found',{
        
       });
       localStorage.setItem('global_search', 'false');
       this.loading = false;
      }
     else{
      this.searchcategories = res.categories;
      // this.products = res.products;
      localStorage.setItem('global_search', 'false');
      this.globalsearch = true;
      this.categories = false;
      this.loading = false;
     }
    })
  }
  else{
    this.crexinservice.getallcategories().subscribe((res)=>{
      console.log(res.categories);
      this.allcategories = res.categories;
      this.globalsearch = false;
      this.loading = false;
    });
  }
  }
  categoriedetails(event,cat_id:any,categorie){
    // console.log(categorie);
    this.selectedItem = categorie;
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>('https://superuser.crexin.com/api/equipmentslist?data='+cat_id,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
      this.spinner.show(); 
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 5000);
      console.log(res);
      this.products = res;
    //  this.toastr.success(this.message,res.message,{
    //   
    // });
   },(error)=>{
     console.log(error);
    this.toastr.error(this.message,error.error.error,{
      
    });
   })
   this.firstcategorie = false;
    // this.router.navigate(['/categorie'])
  }
  singleproduct(id:any){
   localStorage.setItem('p_id', id);
   this.route.navigate(['/rent/subcategories'])
  }
  search(search_categorie){
    this.searchval = search_categorie;
    localStorage.setItem('searchval',this.searchval);
    if(this.searchval.length!=0){
      this.searchcat = true;
      this.allcat = false;
    }
    else{
      this.searchcat = false;
      this.allcat = true;
    }
    localStorage.setItem('searchval',search_categorie);
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>('https://superuser.crexin.com/api/searchcategories?category='+search_categorie,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
      console.log(res.categories);
      this.allcategories = res.categories;
      // this.products = res.products;
    })
  }
  subcategories(index:number,id:any,name:any){
    this.selectedIndex = index;
    console.log(name);
    localStorage.setItem('cat_id',id);
    localStorage.setItem('cat_name',name);
    localStorage.setItem('index',index.toString());
    this.c_active = false;
    this.c_unactive = true;
    if(localStorage.getItem('searchval')!=null){
      if(localStorage.getItem('searchval').length!=0){
        localStorage.setItem('global_search','true');
      }
    }
      this.route.navigate(['/rent/subcategories']);
    
  }
  all_categories(){
    // this.router.navigate(['/rent']);
    window.location.reload();
  }
  removeval(){
    window.location.reload();
  }
}
