import { Component, OnInit, Injector } from '@angular/core';
import { Entity } from '../entity';
import { Globals } from '../../globals';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import _ from 'lodash';


//asdf
@Component({
  selector: 'base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.css']
})
export class BaseListComponent implements OnInit {
  entities;
  entityDefaults = {};
  entityEmpty = {
    name: '',
    description: ''
  };
  loaded: Boolean = false;
  selectedEntity;

  private subIdParam: Subscription;
  //private subModeChange: Subscription;
  private route: ActivatedRoute;
  private router: Router;
  globals;

  statusCreate: Boolean = false;

  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.route = injector.get(ActivatedRoute);
    this.globals = injector.get(Globals);
  }

  //overwrite is a must
  getService(): any { }

  ngOnInit() {
    //this.subModeChange = this.globals.editMode.subscribe(function(mode) {
      //console.log(mode);
    //});

    this.getService()
        .getEntity()
        .then((items) => {

          this.loaded = true;
          if (!items) {
            console.error('Get entity request failed');
            return;
          }

          this.entities = items.map(
                    (item) => { return _.defaults(item, this.entityDefaults) })

          //get selected item from url query parameter
          this.subIdParam = this.route.queryParams.subscribe(params => {
            if (params.id && !(this.selectedEntity)) {
              this.selectedEntity = this.entities.filter(item => item._id == params.id)[0];
            }
          });
        });
  }

  ngOnDestroy() {
    if (this.subIdParam) {
      this.subIdParam.unsubscribe();
    }

    //if (this.subModeChange) {
    //  this.subModeChange.unsubscribe();
    //}
  }

  private getIndexOfEntity = (itemId: String) => {
    return this.entities.findIndex((item) => {
      return item._id === itemId;
    });
  }

  selectEntity(entity) {
    this.selectedEntity = entity;
    this.router.navigate([], {queryParams:{id:entity._id}});
  }

  createNewEntity() {
    var entity = _.clone(this.entityEmpty);
    this.statusCreate = true;

    this.selectEntity(entity);
  }

  deleteEntity = (entityId: String) => {
    var idx = this.getIndexOfEntity(entityId);
    if (idx !== -1) {
      this.entities.splice(idx, 1);
      this.selectEntity(null);
    }
    return this.entities;
  }

  addEntity = (entity) => {
    this.entities.push(entity);
    this.selectEntity(entity);
    return this.entities;
  }

  updateEntity = (entity) => {
    var idx = this.getIndexOfEntity(entity._id);
    if (idx !== -1) {
      this.entities[idx] = entity;
      this.selectEntity(entity);
    }
    return this.entities;
  }

}
