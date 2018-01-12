import { Component, Input } from '@angular/core';
import { Class } from '../class';
import { ClassService } from '../class.service';
import { Globals } from '../../globals';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@Component({
  selector: 'class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})

export class ClassDetailsComponent {
  @Input()
  class: Class;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private classService: ClassService, public globals: Globals) {}

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

  createClass(class: Class) {
    this.classService.createClass(class).then((newClass: Class) => {
      this.createHandler(newClass);
    });
  }

  updateClass(class: Class): void {
    this.classService.updateClass(class).then((updatedClass: Class) => {
      this.updateHandler(updatedClass);
    });
  }

  deleteClass(classId: String): void {
    this.classService.deleteClass(classId).then((deletedClassId) => {
      this.deleteHandler(deletedClassId);
    });
  }
}
