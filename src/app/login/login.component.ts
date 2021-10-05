import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toaster } from '../app-functions';
import { User } from '../app.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  usersList!: Array<User>;
  
  constructor(private appService:AppService,private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required]),
    });
    this.getUsers();
  }
  
  getUsers() {
    this.appService.getLeaderBoardMembers().subscribe((res) => {
      this.usersList = [...res];
    })
  }
  submitLogin(){
    const loginObj = this.usersList.find(item => item.email === this.loginForm.value?.email && item.password === this.loginForm.value?.password);
    if(loginObj?.email){
      localStorage.setItem('user',JSON.stringify(loginObj));
      this.router.navigate(['/quiz']);
      toaster(`Welcome ${loginObj.name}.. You can start the angular quiz`);
    }else{
      toaster(`Sorry, Credentials are not matched, Please try again or register a new user`);
    };

  }
  navigate(){
    this.router.navigate(['/signup']);
  }
}
