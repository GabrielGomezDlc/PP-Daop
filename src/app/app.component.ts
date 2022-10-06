import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Prueba1';
  options = [
    { path: '/home', title: 'Home'},
    { path: '/business/offers', title: 'Offers'},
  ]
}
