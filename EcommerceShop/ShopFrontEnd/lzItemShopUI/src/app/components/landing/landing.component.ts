import { Component, OnInit } from '@angular/core';
import { LzisApiService } from 'src/app/lzis-api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemCacheService } from 'src/app/item-cache.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit{

  constructor(private api: LzisApiService, private fb: FormBuilder, private router: Router, private cache : ItemCacheService) {}

  userForm : FormGroup = this.fb.group({
    username : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    //Inital User Model Builder
    this.cache.user.userID = 0;
    this.cache.user.username = "";
    this.cache.user.password = "";
    this.cache.user.zeldaCharacter = "true";
    this.cache.user.coinBank = 0;
    this.cache.user.clickPower = 1;

    // console.log(this.cache.user)

    this.router.navigateByUrl('');
  }

  onLogin(event: Event) : void {
    if(this.userForm.valid) {
      // console.log(this.userForm.controls['username'].value)
      this.cache.user.username = this.userForm.value['username'];
      this.cache.user.password = this.userForm.value['password'];
      this.api.userLogIn(this.cache.user).subscribe(
        data => {
          this.cache.loggedIn = true;
          this.cache.user = data;
          if(data['zeldaCharacter'] == 'Zelda'){
            this.cache.user.charZelda = true;
          }
          else this.cache.user.charZelda = false;
          this.cache.loggedIn = true;
          this.router.navigateByUrl('in?in=true');
        },
        error => {
          console.log(error);
          this.cache.loggedIn = false;
          alert("Incorrect Login. Try Again");
        }
        
      )
    }
    else {
      event.preventDefault()
      alert("Please input username and password!")
    }
  }

  onRegister(event : Event) : void {
    if(this.userForm.valid) {
      console.log(this.userForm.controls);
      this.cache.user.username = this.userForm.value['username'];
      this.cache.user.password = this.userForm.value['password'];
      console.log(this.cache.user)
      this.api.userRegister(this.cache.user).subscribe(
      data => {
        this.cache.user = data
        console.log(data);
        alert("Account created! Please sign in to get started.");
        },
        error => {
          console.log(error);
          alert("Username Is Already Taken : Try Again");
        }
      );
    }
    else{
      event.preventDefault();
      this.userForm.reset();
    }
  }
}