import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from './search.service';

import { RaceService } from '../races/race.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SearchService, RaceService ]
})
export class SearchComponent implements OnInit {

  query: string;
  searchService: SearchService;
  raceService: RaceService;

  private router: Router;
  private route: ActivatedRoute;
  constructor(injector: Injector) {
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);

    this.searchService = injector.get(SearchService);
    this.raceService = injector.get(RaceService);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params.query;

      console.log(this.searchService);
      console.log(this.raceService);
      //this.searchService.performSearch(params.query);
    });
  }

}
