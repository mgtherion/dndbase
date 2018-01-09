import { Component, Input } from '@angular/core';
import { Race } from '../race';
import { RaceService } from '../race.service';
import { Globals } from '../../globals';

@Component({
  selector: 'race-details',
  templateUrl: './race-details.component.html',
  styleUrls: ['./race-details.component.css']
})

export class RaceDetailsComponent {
  @Input()
  race: Race;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor(private raceService: RaceService, public globals: Globals) {}

  ngOnInit() {
    this.globals.editMode.subscribe(test => console.log(121, test));
  }

  createRace(race: Race) {
    this.raceService.createRace(race).then((newRace: Race) => {
      this.createHandler(newRace);
    });
  }

  updateRace(race: Race): void {
    this.raceService.updateRace(race).then((updatedRace: Race) => {
      this.updateHandler(updatedRace);
    });
  }

  deleteRace(raceId: String): void {
    this.raceService.deleteRace(raceId).then((deletedRaceId) => {
      this.deleteHandler(deletedRaceId);
    });
  }
}
