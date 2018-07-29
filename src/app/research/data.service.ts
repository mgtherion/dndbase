import { Injectable } from '@angular/core';
import { Phone } from './phone';

@Injectable()
export class DataService {

  private companies: string[] = [
    'Apple',
    'Huawei',
    'Samsung',
    'Motorola',
    'Xiaomi',
    'HP',
    'Alcatel'
  ];

  private data: Phone[] = [
    { title: 'iPhone 7', price: 56000, company: 'Apple' },
    { title: 'Elite x3', price: 56000, company: 'HP' },
    { title: 'Idol S4', price: 25000, company: 'Alcatel' }
  ];

  getCompanies(): string[] {
    return this.companies;
  }

  getData(): Phone[] {
    return this.data;
  }

  addData(title: string, price: number, company: string) {
    this.data.push(new Phone(title, price, company));
  }

}
