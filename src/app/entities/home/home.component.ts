import { Component, DestroyRef, ChangeDetectorRef } from '@angular/core';
import { HomeFormBuilderService } from '../home/home.create-form';
import { FormGroup } from '@angular/forms';
import { AppService } from '../services/app.service';
import { IHero } from '../interfaces/app.interface';
import { FilterService } from '../services/filter.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  public heroForm: FormGroup;
  public addAbilities: FormGroup;
  public tableData: IHero[] = [];
  
  public selectedSorting: string = this._filter.powerFilter;
  public nameFilter: string = this._filter.nameFilter;
  public abilitiesFitler: string[] = this._filter.abilitiesFitler;
  public minLevelFilter: number = this._filter.minLevelFilter;
  public maxLevelFilter: number = this._filter.maxLevelFilter;

  public select_ability: string[] = new Array(
    'Летать',
    'Телепортироваться',
    'Читать мысли',
    'Быть бессмертным',
    'Ловкость',
    'Регенерация',
    'Изменение внешности',
    'Телекинез',
    'Исцеление',
    'Сверхчеловеческая сила',
  );

  public sorting: string[] = [
    'По возрастанию',
    'По убыванию',
  ];

  constructor(
    private readonly _fb: HomeFormBuilderService,
    private readonly _appService: AppService,
    private readonly _cd: ChangeDetectorRef,
    private readonly _filter: FilterService,
    private readonly _destroyRef: DestroyRef
  ) {
    this.heroForm = this._fb.createHeroForm();
    this.addAbilities = this._fb.addAbilities();
  }
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
            this.tableData = heroes;
            this.sortData();
            this.filterData(this.minLevelFilter, this.maxLevelFilter, this.nameFilter, this.abilitiesFitler)
    });
  }
  /**
   * Создание героя 
   * 
   * @method
   * @description создание нового героя с помощью метода setHeroes() из сервиса AppService, привязка методов 
   * sortData() и filterData() к кнопке создания героя
   * @public
   * @return {void}
   */
  public createHero(): void {
    this._appService.setHeroes(this.heroForm.value);
    this.sortData()
    this.filterData(this.minLevelFilter, this.maxLevelFilter, this.nameFilter, this.abilitiesFitler)
  }
  /**
   * Добавление способности в массив
   * 
   * @method
   * @description добавление способности в массив: проверка форм группы на валидность, получение значения форм контрола,
   * запись значения в массив и сброс форм группы
   * @public
   * @return {void}
   */
  public addAbilityTo(): void {
    if (this.addAbilities.valid) {
      this.select_ability.push(this.addAbilities.value.abilities!);
      this.addAbilities.reset();
    }
  }
  /**
   * Удаление карточки героя и строки из таблицы
   * 
   * @method
   * @param {IHero} hero - строка таблицы/карточка героя
   * @description удаление карточки героя и строки из таблицы с помощью вызова метода deleteRow из AppService,
   * привязка методов sortData() и filterData() к кнопке удаления карточки героя
   * @public
   * @type {IHero}
   */
  public deleteHero(hero: IHero) {
    this._appService.deleteRow(hero);
    this.sortData()
    this.filterData(this.minLevelFilter, this.maxLevelFilter, this.nameFilter, this.abilitiesFitler)
  }
  /**
   * Сортировка героев по уровню 
   * 
   * @method
   * @description сортировка карточек героев по уровню в зависимости от выбранного пользователем значения,
   * хранение выбранной пользователем сортировки в переменной
   * @public
   * @return {void}
   */
  public sortData(): void {
    if (this.selectedSorting === 'По убыванию') {
      this.tableData.sort((a: IHero, b: IHero) => b.level - a.level);
    } else {
      this.tableData.sort((a: IHero, b: IHero) => a.level - b.level);
    }
    this._filter.powerFilter = this.selectedSorting
  }
  /**
   * Фильтрация карточек героев
   * 
   * @method
   * @param {number} minLevel - минимальное значение уровня, с которого отображаются герои
   * @param {number} maxLevel - максимальное значение уровня, до которого отображаются герои
   * @param {string} name - переменная для поиска по имени
   * @param {string[]} abilities - способности отображаемых героев
   * @description хранение выбранных пользователем критериев фильтрации в переменных, подписка и отписка на поток, фильтрация исходного массива heroes на основе
   * всех параметров, обновление отображаемого массива
   * @public
   */
  public filterData( minLevel: number, maxLevel: number, name: string, abilities: string[] = [] ): void {
    
    this.minLevelFilter = this._filter.minLevelFilter = minLevel;
    this.maxLevelFilter = this._filter.maxLevelFilter = maxLevel;
    this.nameFilter = this._filter.nameFilter = name;
    this.abilitiesFitler = this._filter.abilitiesFitler = abilities;

    this._appService.heroes$
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((heroes: IHero[]) => {
          this.tableData = heroes
          .filter(hero => hero.level >= minLevel && (maxLevel === 0 || hero.level <= maxLevel))
          .filter(hero => name.length >= 2 ? hero.name.toLowerCase().includes(name.toLowerCase()): true)
          .filter(hero => abilities.every(ability => hero.abilities.includes(ability)));
        });
    this._cd.detectChanges();
  }

  }





