import { Component, OnInit } from '@angular/core';
import { Race } from '../race';
import { RaceService } from '../race.service';
import { RaceDetailsComponent } from '../race-details/race-details.component';

@Component({
  selector: 'race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.css'],
  providers: [ RaceService ]
})
export class RaceListComponent implements OnInit {

  races: Race[]
  selectedRace: Race

  constructor(private raceService: RaceService) { }

  ngOnInit() {
    this.raceService
        .getRaces()
        .then((races: Race[]) => {
          this.races = races.map((race) => {
            if (!race.tooltip) {
              race.tooltip = 'Author is too lazy to write a tooltip';
            }
            if (!race.description) {
              race.description = 'Author is too lazy to write a description';
            }
            return race;
          });
        });
  }

  private getIndexOfRace = (raceId: String) => {
    return this.races.findIndex((race) => {
      return race._id === raceId;
    });
  }

  selectRace(race: Race) {
    this.selectedRace = race;
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
