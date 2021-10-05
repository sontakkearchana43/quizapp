import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../app.model';
import { AppService } from '../app.service';
import { toaster } from '../app-functions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(private appService:AppService,private fb:FormBuilder, private router:Router) { }
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email:new FormControl('',[Validators.required,Validators.email]),
      name:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
    });
  }
  
  signUp() {
    const user:User = {
       ...this.signupForm.value,
       id:Math.floor(Math.random() * 100000),
       score:1
    }
    this.appService.signUp(user).subscribe((res) => {
      this.router.navigate(['/login']);
      toaster("Successfully User is created, now you can login....");
    })
  }

  navigate(){
      this.router.navigate(['/login']);
  }
}
