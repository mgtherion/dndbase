import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Phone } from '../phone';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'data-comp',
  templateUrl: './data.component.html'
  //providers: [ DataService ]
  //this level inject will create dataservice instance with every data-comp instance
})
export class DataComponent implements OnInit {

  phone: Phone = new Phone('', null, 'Apple');
  phones: Phone[] = [];
  companies: string[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.phones = this.dataService.getData();
    this.companies = this.dataService.getCompanies();
  }

  addItem(title: NgModel, price: NgModel, company: NgModel) {
    this.dataService.addData(
      title.model,
      price.model,
      company.model
    );
    this.resetForm();
  }

  resetForm() {
    this.phone = new Phone('', null, 'Apple');
  }

  onTitleChange() {
    if (this.phone.title === '111') {
      this.phone.title = '222';
    }
  }

}
