import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query: string;

  private router: Router;
  private route: ActivatedRoute;
  constructor(injector: Injector) {
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params.query;
    });
  }

}
