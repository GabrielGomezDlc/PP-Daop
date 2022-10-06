import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import * as _ from 'lodash';
import {Offer} from "../../model/offer";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {OffersService} from "../../services/offers.service";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit, AfterViewInit {

    offerData: Offer;
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['id', 'title', 'image', 'challengeType', 'businessId', 'actions'];

  @ViewChild('offerForm', {static: false})
  offerForm!: NgForm;

  @ViewChild(MatPaginator, {static: false})
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;


  constructor(private offersService: OffersService) {
    this.offerData={} as Offer;
    this.dataSource=new MatTableDataSource<any>()
  }

  ngOnInit(): void {
    this.getAllOffers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAllOffers() {
    this.offersService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: Offer) {
    this.offerData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.offerForm.resetForm();
  }

  deleteItem(id: number) {
    this.offersService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data
        .filter((o: Offer) => { return o.id !== id ? o : false; });
    });
    console.log(this.dataSource.data);
  }

  addOffer() {
    this.offerData.id = 0;
    this.offersService.create(this.offerData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o});
    });
  }

  updateOffer() {
    this.offersService.update(this.offerData.id, this.offerData)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data
          .map((o: Offer) => {
            if (o.id === response.id) {
              o = response;
            }
            return o;
          });
      });
  }

  onSubmit() {
    if (this.offerForm.form.valid) {
      if(this.offerData.title.length<60 && parseInt(this.offerData.urlToImage)<100 ) {
        console.log('Valid Data');

        if (this.isEditMode) {
          console.log('About to update');
          this.updateOffer();
        } else {
          console.log('About to add');
          this.addOffer();
        }
        this.cancelEdit();
      }
    } else {
      console.log('Invalid data');
    }
  }
}
