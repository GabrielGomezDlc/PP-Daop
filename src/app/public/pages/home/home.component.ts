import { Component, OnInit } from '@angular/core';
import {OffersService} from "../../../business/services/offers.service";
import {Offer} from "../../../business/model/offer";
import {OffersComponent} from "../../../business/pages/offers/offers.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  teamsOffers: Offer[]=[];
  individualsOffers: Offer[]=[]

  constructor(private offersService: OffersService) {

  }

  ngOnInit(): void {
    this.getOffers();
  }

  getOffers(){
    this.offersService.getItemByField("challengeType", "Team").subscribe((response:any)=>{
      this.teamsOffers = response;
    })
    this.offersService.getItemByField("challengeType", "Individual").subscribe((response:any)=>{
      this.individualsOffers = response;
    })
  }

}
