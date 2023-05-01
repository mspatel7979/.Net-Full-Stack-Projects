import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ItemCacheService } from 'src/app/item-cache.service';
import { LzisApiService } from 'src/app/lzis-api.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  user : User = { };
  isZelda : boolean = false;
  zelda: string = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b269c80f-3857-47f7-a98e-60beacda8c1e/d5ohpu2-b0dfca9b-d012-467a-8b9f-be837ad28062.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2IyNjljODBmLTM4NTctNDdmNy1hOThlLTYwYmVhY2RhOGMxZVwvZDVvaHB1Mi1iMGRmY2E5Yi1kMDEyLTQ2N2EtOGI5Zi1iZTgzN2FkMjgwNjIuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.UzQlEIyWKH--KHK66_-1p89hSr_AwOanKBsoHaFgUyU";
  link: string = "https://i.pinimg.com/originals/12/af/f4/12aff4ef860ccc2f2beb4715cfd9c1ae.gif";
  
  constructor(private cache : ItemCacheService) {}

  ngOnInit(): void {
    if(this.cache.loggedIn) {
      this.user = this.cache.user;
      this.isZelda = this.cache.user.charZelda? true : false;
    }
  }

  toggleChar() {
    this.isZelda = this.isZelda ? false : true;
    this.cache.user.charZelda = this.isZelda;
  }

  moneyButton() {
    if(this.cache.user.coinBank != null && this.cache.user.clickPower != null) {
      this.cache.user.coinBank += this.cache.user.clickPower;
    }
  }

}
