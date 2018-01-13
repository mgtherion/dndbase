import { Component, OnInit } from '@angular/core';
import { Klass } from '../klass';
import { KlassService } from '../klass.service';
import { KlassDetailsComponent } from '../klass-details/klass-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'klass-list',
  templateUrl: './klass-list.component.html',
  styleUrls: ['./klass-list.component.css'],
  providers: [ KlassService ]
})
export class KlassListComponent implements OnInit {

  klasses: Klass[]
  selectedKlass: Klass
  private sub: Subscription;

  constructor(private klassService: KlassService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.klassService
        .getKlasses()
        .then((klasses: Klass[]) => {

          this.klasses = klasses.map((klass) => {
            if (!klass.tooltip) {
              klass.tooltip = 'Author is too lazy to write a tooltip';
            }
            if (!klass.description) {
              klass.description = 'Author is too lazy to write a description';
            }
            return klass;
          });

          //get selected klass from url query parameter
          this.sub = this.route.queryParams.subscribe(params => {
            if (params.id && !(this.selectedKlass)) {
              this.selectedKlass = this.klasses.filter(item => item._id == params.id)[0];
            }
          });
        });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private getIndexOfKlass = (klassId: String) => {
    return this.klasses.findIndex((klass) => {
      return klass._id === klassId;
    });
  }

  selectKlass(klass: Klass) {
    this.selectedKlass = klass;
    this.router.navigate([], {queryParams:{id:klass._id}});
  }

  createNewKlass() {
    var klass: Klass = {
      name: '',
      tooltip: '',
      description: ''
    }

    this.selectKlass(klass);
  }

  deleteKlass = (klassId: String) => {
    var idx = this.getIndexOfKlass(klassId);
    if (idx !== -1) {
      this.klasses.splice(idx, 1);
      this.selectKlass(null);
    }
    return this.klasses;
  }

  addKlass = (klass: Klass) => {
    this.klasses.push(klass);
    this.selectKlass(klass);
    return this.klasses;
  }

  updateKlass = (klass: Klass) => {
    var idx = this.getIndexOfKlass(klass._id);
    if (idx !== -1) {
      this.klasses[idx] = klass;
      this.selectKlass(klass);
    }
    return this.klasses;
  }

}
