import
  { Component,
    Input,
    Output,
    EventEmitter,
    ContentChild,
    OnInit,
    ElementRef } from '@angular/core';

@Component({
  selector: 'test-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  _userName: string;
  userNameOverflow: boolean;

  @Input()
  count: number;

  //getting username from parent component through setter
  @Input()
  set userName(name: string) {
    if (name.length > 10) {
      this._userName = name.slice(0, 10);
      this.userNameOverflow = true; //mark username as cropped
    } else {
      this._userName = name;
      this.userNameOverflow = false;
    }
  }

  get userName() {
    return this._userName;
  }

  //emitting to parent components method
  @Output()
  onCountChanged = new EventEmitter<number>();

  increase() {
    this.onCountChanged.emit(this.count + 1);
  }

  decrease() {
    this.onCountChanged.emit(this.count - 1);
  }

  @Input()
  description: string;

  @Output()
  descriptionChange = new EventEmitter<string>();
  //WORK ONLY FOR EVENT WITH propertyName + Change NAMING

  onDescChange(value: string) {
    this.description = value;
    this.descriptionChange.emit(value);
  }

  //content child is local reference variable inside component ng-content
  @ContentChild('childVariable')
  tmpVariable: ElementRef;

  ngOnInit() {
    //access to local reference variable
    this.tmpVariable.nativeElement.textContent = 'child template variable';
  }
}
