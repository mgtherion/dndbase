import { Injectable, Injector } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class BaseService {
  entityUrl = 'none'; //overwrite is a must
  private http: Http;

  constructor(injector: Injector) {
    this.http = injector.get(Http);
  }

  getEntity(): Promise<any> {
    return this.http.get(this.entityUrl)
                    .toPromise()
                    .then(response => response.json() as any[])
                    .catch(this.handleError);
  }

  createEntity(newEntity): Promise<any> {
    return this.http.post(this.entityUrl, newEntity)
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
  }

  deleteEntity(delEntityId: String): Promise<any> {
    return this.http.delete(this.entityUrl + '/' + delEntityId)
                    .toPromise()
                    .then(response => response.json() as String)
                    .catch(this.handleError);
  }

  updateEntity(putEntity): Promise<any> {
    var putUrl = this.entityUrl + '/' + putEntity._id;
    return this.http.put(putUrl, putEntity)
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
