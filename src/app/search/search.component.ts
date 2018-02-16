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

  query: string;
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
      this.query = params.query;

      console.log(this.searchService);
      //this.searchService.performSearch(params.query);
    });
  }

}
