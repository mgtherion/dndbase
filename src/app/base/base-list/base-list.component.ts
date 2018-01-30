import { Component, OnInit, Injector } from '@angular/core';
import { Entity } from '../entity';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import _ from 'lodash';

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

  private sub: Subscription;
  private route: ActivatedRoute;
  private router: Router;

  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.route = injector.get(ActivatedRoute);
  }

  //overwrite is a must
  getService(): any { }

  ngOnInit() {
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
          this.sub = this.route.queryParams.subscribe(params => {
            if (params.id && !(this.selectedEntity)) {
              this.selectedEntity = this.entities.filter(item => item._id == params.id)[0];
            }
          });
        });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
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
