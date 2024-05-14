import { Component, DestroyRef, ViewChild } from '@angular/core';
import { IHero } from '../interfaces/app.interface';
import { MatTable } from '@angular/material/table';
import { AppService } from '../services/app.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @ViewChild(MatTable) public table?: MatTable<IHero>

  displayedColumns: string[] = ['name', 'level', 'power', 'abilities','del'];

  public dataSource: IHero[] = [];

  constructor(
    private readonly _appService: AppService,
    private readonly _destroyRef: DestroyRef
  ) { }
  /**
   * Lifecycle hook
   * 
   * @method
   * @description подписка и отписка от потока, наполнение отображаемого массива значениями, вызов методов сортировки и фильтрации
   * @public
   * @return {void}
   */
  public ngOnInit(): void {
    this._appService.heroes$
              .pipe(takeUntilDestroyed(this._destroyRef))
              .subscribe((heroes: IHero[]) => {
      this.dataSource = heroes;
    });
  }
  /**
   * Удаление строки из таблицы и карточки героя
   * 
   * @method
   * @param {IHero} row - строка таблицы/карточка героя
   * @description удаление карточки героя и строки из таблицы с помощью вызова метода deleteRow из AppService,
   * обновление строк таблицы
   * @public
   * @type {IHero}
   */
  public deleteRow(row: IHero): void {
    this._appService.deleteRow(row);
    this.table?.renderRows();
  }

}
