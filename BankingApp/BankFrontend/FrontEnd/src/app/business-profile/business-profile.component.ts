import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit {

  constructor(private router: Router, private uds: UserDataService, private cookie: CookieService){}

  Email : string = "";
  businessName : string = "";
  address : string = "";
  bin : string = "";
  busType : string = "";
  username : string = "";
  busObj : any = {};

  ngOnInit(): void {
    this.Email = this.cookie.get('email');
    this.uds.getUser();
    this.uds.retrieveBusinessIdFromDB(this.uds.getUser()).subscribe(data => {
      this.uds.Id = data;
    });
    this.uds.getFullBusinessUser(this.uds.Id).subscribe(data => {
      console.log(data);
      this.busObj = data;
      this.businessName = data[0].businessName;
      this.address = data[0].address;
      this.username = data[0].username;
      this.bin = data[0].bin;
      this.busType = data[0].businessType;
    });
  }

  onKey(event: any, field: string) {
    const inputValue = event.target.value;
    if (field === 'businessName') {
      this.businessName = inputValue;
    } 
    else if (field === 'bin') {
      this.bin = inputValue;
    } 
    else if (field === 'busType') {
      this.busType = inputValue;
    } 
    else if (field === 'address') {
      this.address = inputValue;
    }
  }

  saveProfile(event : Event){
    this.busObj[0].businessName = this.businessName;
    this.busObj[0].address = this.address;
    this.busObj[0].bin = this.bin;
    this.busObj[0].businessType = this.busType;
    this.uds.updateBusinessProfile(this.busObj[0]).subscribe(data => console.log(data));
    this.router.navigate(['/BusinessHome']);
  }

  exit(event : Event) {
    this.router.navigate(['/BusinessHome']);
  }
}
