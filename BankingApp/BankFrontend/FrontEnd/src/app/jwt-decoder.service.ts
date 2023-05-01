import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {
  token = localStorage.getItem('access_token')
  constructor() { }
  printTokenInfo(): void {
    if (this.token) {
      console.log(JSON.parse(this.token));

    }
  }
}
