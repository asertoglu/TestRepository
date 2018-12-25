import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted= false;
  message: string;

  loginForm = new FormGroup({
    username: new FormControl('asert'),
    password: new FormControl('casert'),
    remember: new FormControl(false)
  });

  onSubmit(): void {
    this.submitted= true;
    console.log(this.loginForm.value);
    this.message= 'Username: ' + this.loginForm.get('username').value + ', Password: ' + this.loginForm.get('password').value;
    //console.log(this.loginForm.get('username').value);
  }
  
  constructor() { }

  ngOnInit() {
  }


}
