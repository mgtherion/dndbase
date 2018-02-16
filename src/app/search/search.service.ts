import { Injectable, Injector } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class SearchService {

  searchUrl: string = '/search';

  private http: Http;

  constructor(injector: Injector) {
    this.http = injector.get(Http);
  }

  performSearch(params): Promise<any> {
    return this.http.get(this.searchUrl, params)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}`: 'Server Error';
    console.log(errMsg);
  }

}
