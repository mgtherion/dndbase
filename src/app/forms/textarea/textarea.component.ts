import { Component, Input, Output, EventEmitter, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from '../../globals';

@Component({
  selector: 'form-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent {

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
