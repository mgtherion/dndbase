import { Component, OnInit, Input, Injector } from '@angular/core';
import { Globals } from '../../globals';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

//OLOLO
//1234
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

  globals;
  private route: ActivatedRoute;
  constructor(injector: Injector) {
   this.globals = injector.get(Globals);
   this.route = injector.get(ActivatedRoute);
  }

  private sub: Subscription;
  ngOnInit() {
    this.sub = this.globals.editMode.subscribe(function(mode) {
      console.log(mode);
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
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
