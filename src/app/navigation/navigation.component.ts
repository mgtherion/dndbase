import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public globals: Globals) {}

  ngOnInit() {
  }

  changeMode(value: boolean) {
    this.globals.setMode(value);
  }

}
