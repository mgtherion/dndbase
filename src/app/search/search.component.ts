import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from './search.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SearchService ]
})
export class SearchComponent implements OnInit {

  query: any = {};
  searchService: SearchService;

  private router: Router;
  private route: ActivatedRoute;
  constructor(injector: Injector) {
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);

    this.searchService = injector.get(SearchService);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.query) {
        this.query.query = params.query;
      }

      this.searchService.performSearch(this.query);
    });
  }

  performSearch() {
    this.router.navigate([], {queryParams: this.query});
    this.searchService.performSearch(this.query);
  }
}
