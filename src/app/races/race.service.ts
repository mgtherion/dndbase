import { Injectable } from '@angular/core';
import { Race } from './race';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RaceService {
  private racesUrl = '/api/races';

  constructor(private http: Http) { }

  // get('/api/races')
  getRaces(): Promise<void | Race[]> {
    return this.http.get(this.racesUrl)
                    .toPromise()
                    .then(response => response.json() as Race[])
                    .catch(this.handleError);
  }

  // post('/api/races')
  createRace(newRace: Race): Promise<void | Race> {
    return this.http.post(this.racesUrl, newRace)
                    .toPromise()
                    .then(response => response.json() as Race)
                    .catch(this.handleError);
  }

  // delete('/api/races/:id')
  deleteRace(delRaceId: String): Promise<void | String> {
    return this.http.delete(this.racesUrl + '/' + delRaceId)
                    .toPromise()
                    .then(response => response.json() as String)
                    .catch(this.handleError);
  }

  // put('/api/races/:id')
  updateRace(putRace: Race): Promise<void | Race> {
    var putUrl = this.racesUrl + '/' + putRace._id;
    return this.http.put(putUrl, putRace)
                    .toPromise()
                    .then(response => response.json() as Race)
                    .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}`: 'Server Error';
    console.log(errMsg);
  }
}
