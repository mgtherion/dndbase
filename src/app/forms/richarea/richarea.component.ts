import { Component, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Component({
  selector: 'form-richarea',
  templateUrl: './richarea.component.html',
  styleUrls: ['./richarea.component.css']
})
export class RichareaComponent {

  @Output('changeValue')
  emitter: EventEmitter<string> = new EventEmitter<string>();
  @Input('bindto')
  description: string;


  //set initValue(value) {
  //  this.description = value;
  //}
  //description: string = '';

  setValue() {
    this.emitter.emit(this.description);
  }
  public options: any = {
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', '|', 'fontSize',
                      'color', '|', 'specialCharacters', 'clearFormatting', '|', 'undo', 'redo'],
    quickInsertButtons: [],
    quickInsertTags: [],
    placeholderText: '',
    events: {
      'froalaEditor.keydown': function(e, editor) {
        //console.log(123, instance);
      }
    }
  }

}
