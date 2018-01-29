import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'form-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent {

  @Output('bindToChange')
  emitter: EventEmitter<string> = new EventEmitter<string>();

  @Input('bindTo')
  set initValue(init) {
    this.value = init;
  }
  value: string = '';

  @Input('label')
  label: string;

  setValue(e) {
    Observable.timer(50).subscribe(() => {
      this.emitter.emit(e.target.value);
    });

  }



}
