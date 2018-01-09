import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class Globals {
  editMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setMode(mode: boolean) {
    this.editMode.next(mode);
  }
}