import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Offer} from "../model/offer";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OffersService extends BaseService<Offer>{

  endPoint = '/offers'

  constructor(http:HttpClient) {
    super(http);
    this.basePath += this.endPoint;
  }
}
