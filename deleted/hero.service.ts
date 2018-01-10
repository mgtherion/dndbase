import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
      this.messageService.add('HeroService: hero fetched');
      console.log(this.messageService.messages);
      return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
      this.messageService.add(`HeroService: hero with id=${id} fetched`);
      return of(HEROES.find(hero => hero.id === id));
  }

}
