import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

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

  setValue(e) {
    Observable.timer(50).subscribe(() => {
      this.emitter.emit(e.target.value);
    });

  }



}
