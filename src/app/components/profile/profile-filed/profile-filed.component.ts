import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CrexinService } from 'src/app/services/crexin.service';
@Component({
  selector: 'app-profile-filed',
  templateUrl: './profile-filed.component.html',
  styleUrls: ['./profile-filed.component.css']
})
export class ProfileFiledComponent implements OnInit {
  closeResult: string;
  submitted = false;
  Profile:FormGroup;
  // mobile = localStorage.getItem('mobile');
  // firstname = localStorage.getItem('firstname');
  // email = localStorage.getItem('email');
  message: string;
  success: any;
  modal_close:boolean;
  constructor(private modalService: NgbModal, private fb:FormBuilder, private crexinService:CrexinService,  private toastr:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.Profile = this.fb.group({
      fullname : ['', Validators.required],
      mobile : ['', [Validators.required, Validators.pattern(("^((\\+91-?)|0)?[0-9]{10}$"))]],
      email : ['', [Validators.required, Validators.email]]
    })
  }
  get f(){
    return this.Profile.controls
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  updateprofile(){
     this.submitted = true;
     if(this.Profile.invalid){
       return false
     }
     else{
       const data = {
          //  id : localStorage.getItem('user_id'),
          fullname : this.Profile.get('fullname').value,
          mobile : this.Profile.get('mobile').value,
          email : this.Profile.get('email').value
       }
       console.log(data)
       this.crexinService.profileupdate(data).subscribe((res)=>{
         console.log(res.data);
         localStorage.setItem('firstname',res.data.firstname);
         localStorage.setItem('email',res.data.email);
         localStorage.setItem('mobile',res.data.mobile);
         this.success = res.message;
         this.toastr.success(this.message,this.success,{
          
        });
        this.modal_close = false;
       }, (error)=>{
        this.toastr.error(this.message,error.error.message,{
          
        });
       })
     }
  }
 get firstname(){
   return localStorage.getItem('firstname');
 }
 get mobile(){
  return localStorage.getItem('mobile');
}
get email(){
  return localStorage.getItem('email');
}
}
