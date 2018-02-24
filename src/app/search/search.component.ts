import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from './search.service';
import _ from 'lodash';



@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SearchService ]
})
export class SearchComponent implements OnInit {

  LABELS = {
    races: 'badge-default',
    classes: 'badge-primary',
    skills: 'badge-success',
    items: 'badge-info',
    enchantments: 'badge-warning'
  };

  entities: any[] = [];
  loaded: boolean = false;

  private initialSearch: boolean = true;

  query: any = {};
  private searchService: SearchService;

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

      if (this.initialSearch) {
        this.performSearch();
        this.initialSearch = false;
      }
    });
  }

  performSearch() {
    this.entities = [];
    this.loaded = false;

    this.router.navigate([], {queryParams: this.query});

    this.searchService
        .performSearch(this.query)
        .then((results) => {
          console.log('RESULTS', results);
          this.loaded = true;
          var temp = [], labeledItems;

          _.forOwn(results, (items, key) => {
            labeledItems = _.map(items, (item) => {
              return _.defaults(item, {label: key});
            });
            temp = _.concat(temp, labeledItems);
          });

          this.entities = temp;
        });
  }
}
