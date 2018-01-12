import { Component, OnInit } from '@angular/core';
import { Class } from '../class';
import { ClassService } from '../class.service';
import { ClassDetailsComponent } from '../class-details/class-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css'],
  providers: [ ClassService ]
})
export class ClassListComponent implements OnInit {

  classes: Class[]
  selectedClass: Class
  private sub: Subscription;

  constructor(private classService: ClassService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.classService
        .getClasses()
        .then((classes: Class[]) => {

          this.classes = classes.map((class) => {
            if (!class.tooltip) {
              class.tooltip = 'Author is too lazy to write a tooltip';
            }
            if (!class.description) {
              class.description = 'Author is too lazy to write a description';
            }
            return class;
          });

          //get selected class from url query parameter
          this.sub = this.route.queryParams.subscribe(params => {
            if (params.id && !(this.selectedClass)) {
              this.selectedClass = this.classes.filter(item => item._id == params.id)[0];
            }
          });
        });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private getIndexOfClass = (classId: String) => {
    return this.classes.findIndex((class) => {
      return class._id === classId;
    });
  }

  selectClass(class: Class) {
    this.selectedClass = class;
    this.router.navigate([], {queryParams:{id:class._id}});
  }

  createNewClass() {
    var class: Class = {
      name: '',
      tooltip: '',
      description: ''
    }

    this.selectClass(class);
  }

  deleteClass = (classId: String) => {
    var idx = this.getIndexOfClass(classId);
    if (idx !== -1) {
      this.classes.splice(idx, 1);
      this.selectClass(null);
    }
    return this.classes;
  }

  addClass = (class: Class) => {
    this.classes.push(class);
    this.selectClass(class);
    return this.classes;
  }

  updateClass = (class: Class) => {
    var idx = this.getIndexOfClass(class._id);
    if (idx !== -1) {
      this.classes[idx] = class;
      this.selectClass(class);
    }
    return this.classes;
  }

}
