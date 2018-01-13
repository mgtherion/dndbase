import { Injectable } from '@angular/core';
import { Klass } from './klass';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class KlassService {
  private klassesUrl = '/api/klasses';

  constructor(private http: Http) { }

  // get('/api/klasses')
  getKlasses(): Promise<void | Klass[]> {
    return this.http.get(this.klassesUrl)
                    .toPromise()
                    .then(response => response.json() as Klass[])
                    .catch(this.handleError);
  }

  // post('/api/klasses')
  createKlass(newKlass: Klass): Promise<void | Klass> {
    return this.http.post(this.klassesUrl, newKlass)
                    .toPromise()
                    .then(response => response.json() as Klass)
                    .catch(this.handleError);
  }

  // delete('/api/klasses/:id')
  deleteKlass(delKlassId: String): Promise<void | String> {
    return this.http.delete(this.klassesUrl + '/' + delKlassId)
                    .toPromise()
                    .then(response => response.json() as String)
                    .catch(this.handleError);
  }

  // put('/api/klasses/:id')
  updateKlass(putKlass: Klass): Promise<void | Klass> {
    var putUrl = this.klassesUrl + '/' + putKlass._id;
    return this.http.put(putUrl, putKlass)
                    .toPromise()
                    .then(response => response.json() as Klass)
                    .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}`: 'Server Error';
    console.log(errMsg);
  }
}
