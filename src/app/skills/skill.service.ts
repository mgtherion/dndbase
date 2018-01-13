import { Injectable } from '@angular/core';
import { Skill } from './skill';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SkillService {
  private skillsUrl = '/api/skills';

  constructor(private http: Http) { }

  // get('/api/skills')
  getSkills(): Promise<void | Skill[]> {
    return this.http.get(this.skillsUrl)
                    .toPromise()
                    .then(response => response.json() as Skill[])
                    .catch(this.handleError);
  }

  // post('/api/skills')
  createSkill(newSkill: Skill): Promise<void | Skill> {
    return this.http.post(this.skillsUrl, newSkill)
                    .toPromise()
                    .then(response => response.json() as Skill)
                    .catch(this.handleError);
  }

  // delete('/api/skills/:id')
  deleteSkill(delSkillId: String): Promise<void | String> {
    return this.http.delete(this.skillsUrl + '/' + delSkillId)
                    .toPromise()
                    .then(response => response.json() as String)
                    .catch(this.handleError);
  }

  // put('/api/skills/:id')
  updateSkill(putSkill: Skill): Promise<void | Skill> {
    var putUrl = this.skillsUrl + '/' + putSkill._id;
    return this.http.put(putUrl, putSkill)
                    .toPromise()
                    .then(response => response.json() as Skill)
                    .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}`: 'Server Error';
    console.log(errMsg);
  }
}
