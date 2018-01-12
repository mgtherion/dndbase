import { Injectable } from '@angular/core';
import { Class } from './class';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClassService {
  private classesUrl = '/api/classes';

  constructor(private http: Http) { }

  // get('/api/classes')
  getClasses(): Promise<void | Class[]> {
    return this.http.get(this.classesUrl)
                    .toPromise()
                    .then(response => response.json() as Class[])
                    .catch(this.handleError);
  }

  // post('/api/classes')
  createClass(newClass: Class): Promise<void | Class> {
    return this.http.post(this.classesUrl, newClass)
                    .toPromise()
                    .then(response => response.json() as Class)
                    .catch(this.handleError);
  }

  // delete('/api/classes/:id')
  deleteClass(delClassId: String): Promise<void | String> {
    return this.http.delete(this.classesUrl + '/' + delClassId)
                    .toPromise()
                    .then(response => response.json() as String)
                    .catch(this.handleError);
  }

  // put('/api/classes/:id')
  updateClass(putClass: Class): Promise<void | Class> {
    var putUrl = this.classesUrl + '/' + putClass._id;
    return this.http.put(putUrl, putClass)
                    .toPromise()
                    .then(response => response.json() as Class)
                    .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}`: 'Server Error';
    console.log(errMsg);
  }
}
