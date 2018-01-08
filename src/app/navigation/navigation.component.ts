import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private editMode: boolean;

  constructor(private globals: Globals) {
    this.editMode = globals.editMode;
  }

  ngOnInit() {
  }

  changeMode(value: boolean) {
    this.editMode = value;
    this.globals.editMode = value;
  }

}
