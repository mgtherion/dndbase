import { Component, Input, Output, EventEmitter, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from '../../globals';

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

  globals;
  constructor(injector: Injector) {
    this.globals = injector.get(Globals);
  }
}
