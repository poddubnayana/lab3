import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IHero } from '../interfaces/app.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public _heroes$$: BehaviorSubject<IHero[]> = new BehaviorSubject<IHero[]>([
    { 
    abilities: ["Летать","Ловкость"],
    level: 3,
    name: "СССупермен",
    power: 5
    },
    { 
      abilities: ["Летать","Читать мысли"],
      level: 5,
      name: "ДДДДДжокер",
      power: 5
    },
    { 
      abilities: ["Летать"],
      level: 8,
      name: "ЯЯЯЯЯЯЯЯна",
      power: 8
    },
  ]);
  public heroes$: Observable<IHero[]> = this._heroes$$.asObservable();

  constructor() { }


  public setHeroes(hero: IHero): void {
    const heroes: IHero[] = this._heroes$$.getValue();
    heroes.push(hero);
    this._heroes$$.next(heroes);
  }

  // public addToData(result: IHero): void {
  //   this.tableData.push(result);
  // };

  public deleteRow(row: IHero): void {
    const heroes: IHero[] = this._heroes$$.getValue();
    const index = heroes.findIndex(item => item === row);
    if (index!== -1) {
      heroes.splice(index, 1);
      this._heroes$$.next(heroes);
    }
  }
}
