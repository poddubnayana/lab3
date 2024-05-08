import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IHero } from '../interfaces/app.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _heroes$$: BehaviorSubject<IHero[]> = new BehaviorSubject<IHero[]>([
    { 
    abilities
: 
"Летать",
level
: 
3,
name
: 
"Яна Сергеевна Поддубная",
power
: 
5}
  ]);
  public heroes$: Observable<IHero[]> = this._heroes$$.asObservable();

  constructor() { }


  public setHeroes(hero: IHero): void {
    const heroes: IHero[] = this._heroes$$.getValue();
    heroes.push(hero);
    this._heroes$$.next(heroes);
  }

  public deleteRow(row: IHero): void {
    const heroes: IHero[] = this._heroes$$.getValue();
    const index = heroes.findIndex(item => item === row);
    if (index!== -1) {
      heroes.splice(index, 1);
      this._heroes$$.next(heroes);
    }
  }
}
