import { Component, OnInit, Injector, Input } from '@angular/core';
import { Globals } from '../globals';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input()
  query: string;

  globals;
  private router: Router;
  private route: ActivatedRoute;
  constructor(injector: Injector) {
    this.globals = injector.get(Globals);
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
  }

  ngOnInit() {
  }

  changeMode(value: boolean) {
    this.globals.setMode(value);
  }

  search() {
    this.router.navigate(['/search'], {queryParams: {query: this.query}});
  }

}
