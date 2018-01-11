import { Component, OnInit } from '@angular/core';
import { Race } from '../race';
import { RaceService } from '../race.service';
import { RaceDetailsComponent } from '../race-details/race-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.css'],
  providers: [ RaceService ]
})
export class RaceListComponent implements OnInit {

  races: Race[]
  selectedRace: Race
  private sub: Subscription;

  constructor(private raceService: RaceService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.raceService
        .getRaces()
        .then((races: Race[]) => {
          /*this.races = [
          {
            "_id":"5a4ef9093dd7c300145e5501",
            "name":"Эльфы",
            "tooltip":"Шмельфы",
            "description":"<p>Author is too lazy to write a <s>description</s></p>",
            "createDate":"2018-01-05T04:03:21.765Z"
          },
          {
            "_id":"5a4efac8cd93770014f7902c",
            "name":"Хоббиты",
            "tooltip":"You better not show them any food",
            "description":"",
            "createDate":"2018-01-05T04:10:48.737Z"
          },
          {
            "_id":"5a504785dd8fc7001401074a",
            "name":"Людишки",
            "tooltip":"Author is too lazy to write a tooltip",
            "description":"<p>Author is too lazy to write a <em>description</em></p>",
            "createDate":"2018-01-06T03:50:29.342Z"
          },
          {
            "_id":"5a4efa1acd93770014f7902b",
            "name":"Дварфы",
            "tooltip":"Author is too lazy to write a tooltip",
            "description":"<p>Author is too lazy to write a <strong>description</strong></p>",
            "createDate":"2018-01-05T04:07:54.258Z"
          }];*/

          this.races = races.map((race) => {
            if (!race.tooltip) {
              race.tooltip = 'Author is too lazy to write a tooltip';
            }
            if (!race.description) {
              race.description = 'Author is too lazy to write a description';
            }
            return race;
          });

          //get selected race from url query parameter
          this.sub = this.route.queryParams.subscribe(params => {
            if (params.id && !(this.selectedRace)) {
              this.selectedRace = this.races.filter(item => item._id == params.id)[0];
            }
          });
        });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private getIndexOfRace = (raceId: String) => {
    return this.races.findIndex((race) => {
      return race._id === raceId;
    });
  }

  selectRace(race: Race) {
    this.selectedRace = race;
    this.router.navigate([], {queryParams:{id:race._id}});
  }

  createNewRace() {
    var race: Race = {
      name: '',
      tooltip: '',
      description: ''
    }

    this.selectRace(race);
  }

  deleteRace = (raceId: String) => {
    var idx = this.getIndexOfRace(raceId);
    if (idx !== -1) {
      this.races.splice(idx, 1);
      this.selectRace(null);
    }
    return this.races;
  }

  addRace = (race: Race) => {
    this.races.push(race);
    this.selectRace(race);
    return this.races;
  }

  updateRace = (race: Race) => {
    var idx = this.getIndexOfRace(race._id);
    if (idx !== -1) {
      this.races[idx] = race;
      this.selectRace(race);
    }
    return this.races;
  }

}
