import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'test-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  @ViewChild('someVariable') //access to template variable
  tmpVariable: ElementRef;

  count: number = 0;
  name: string = 'Peter';
  desc: string = 'test';

  increase() {
    this.count++;
  }

  //method passed to child component
  onCountChanged(newValue: number) {
    this.count = newValue;
  }

  ngOnInit() {
    this.tmpVariable.nativeElement.textContent = 'parent template variable';
  }

}
