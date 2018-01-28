import { Component, OnInit, Input, Injector } from '@angular/core';
//import { Globals } from '../../globals';

@Component({
  selector: 'base-details',
  templateUrl: './base-details.component.html',
  styleUrls: ['./base-details.component.css']
})
export class BaseDetailsComponent implements OnInit {
  @Input()
  entity: any;
  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(injector: Injector) {
    //this.globals = injector.get(Grobals);
  }

  ngOnInit() {
    //this.globals.editMode.subscribe(mode => console.log(mode));
  }

  //overwrite is a must
  getService(): any { }

  public options: any = {
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', '|', 'fontSize',
                      'color', '|', 'specialCharacters', 'clearFormatting', '|', 'undo', 'redo'],
    quickInsertButtons: [],
    quickInsertTags: [],
    placeholderText: ''
  }

  createEntity(entity): void {
    this.getService().createEntity(entity).then((newEntity) => {
      this.createHandler(newEntity);
    });
  }

  updateEntity(entity): void {
    this.getService().updateEntity(entity).then((updatedEntity) => {
      this.updateHandler(updatedEntity);
    });
  }

  deleteEntity(entityId: String): void {
    this.getService().deleteEntity(entityId).then((deletedEntityId) => {
      this.deleteHandler(deletedEntityId);
    });
  }

}