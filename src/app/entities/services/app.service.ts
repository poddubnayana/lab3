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
  /**
   * Сеттер
   * 
   * @method
   * @param {IHero} hero 
   * @description получение значений из BehaviorSubject, их запись в новый массив, обновление потока новым списком героев, передача обновленного массива
   * и вызов следующего метода
   * @public
   * @type {IHero}
   */
  public setHeroes(hero: IHero): void {
    const heroes: IHero[] = this._heroes$$.getValue();
    heroes.push(hero);
    this._heroes$$.next(heroes);
  }
  /**
   * Удаление героя из списка
   * 
   * @method
   * @param {IHero} row 
   * @description получение значений из BehaviorSubject, их запись в новый массив, поиск индекса нужной строки, удаление героя из списка с помощью метода
   * splice(), обновление потока новым списком героев, передача обновленного массива и вызов следующего метода
   * @public
   * @type {IHero} 
   */
  public deleteRow(row: IHero): void {
    const heroes: IHero[] = this._heroes$$.getValue();
    const index = heroes.findIndex(item => item === row);
    if (index!== -1) {
      heroes.splice(index, 1);
      this._heroes$$.next(heroes);
    }
  }
}
