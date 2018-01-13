import { Component, Input } from '@angular/core';
import { Klass } from '../klass';
import { KlassService } from '../klass.service';
import { Globals } from '../../globals';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@Component({
  selector: 'klass-details',
  templateUrl: './klass-details.component.html',
  styleUrls: ['./klass-details.component.css']
})

export class KlassDetailsComponent {
  @Input()
  klass: Klass;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private klassService: KlassService, public globals: Globals) {}

  public options: any = {
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', '|', 'fontSize',
                      'color', '|', 'specialCharacters', 'clearFormatting', '|', 'undo', 'redo'],
    quickInsertButtons: [],
    quickInsertTags: [],
    placeholderText: ''
  }

  ngOnInit() {
    //this.globals.editMode.subscribe(mode => console.log(mode));
  }

  createKlass(klass: Klass) {
    this.klassService.createKlass(klass).then((newKlass: Klass) => {
      this.createHandler(newKlass);
    });
  }

  updateKlass(klass: Klass): void {
    this.klassService.updateKlass(klass).then((updatedKlass: Klass) => {
      this.updateHandler(updatedKlass);
    });
  }

  deleteKlass(klassId: String): void {
    this.klassService.deleteKlass(klassId).then((deletedKlassId) => {
      this.deleteHandler(deletedKlassId);
    });
  }
}
