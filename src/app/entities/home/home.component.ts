import { Component, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { HomeFormBuilderService } from '../home/home.create-form';
import { FormGroup } from '@angular/forms';
import { AppService } from '../services/app.service';
import { IHero } from '../interfaces/app.interface';
import { filter } from 'rxjs/operators';
import { FilterService } from '../services/filter.service';

/** 
 * TO-DO {
 * 3) применение фильтров(вызов функции) после добавления\удаления (нужно хранить их значения в компоненте)
 * 4) применение фильтров после переключения на мэйн пэйдж ( e.g. с таблицы или с 404 )
 *    {1. Переменные из html сохранялись куда-то}
 *    {2. При создании компонента они должны подтягиваться из сохранённого места}
 *    {3. Применение фильтрации после создания}
*/

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  public heroForm: FormGroup;
  public tableData: IHero[] = [];
  public selectedSorting: string = this._filter.powerFilter;
  public addAbilities: FormGroup;
  public nameFilter: string = this._filter.nameFilter;
  public abilitiesFitler: string[] = [];
  public minLevelFilter: number = 0;
  public maxLevelFilter: number = 10;
  // infilter = this._filter.outfilter
  constructor(
    private readonly _fb: HomeFormBuilderService,
    private readonly _appService: AppService,
    private readonly cd: ChangeDetectorRef,
    private readonly _filter: FilterService
    
  ) {
    this.heroForm = this._fb.createHeroForm();
    this.addAbilities = this._fb.addAbilities();
  }

  //@ViewChild('empTbSort') empTbSort = new MatSort();
  
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
  

  createHero(): void {
    this._appService.setHeroes(this.heroForm.value);
    console.log(this.heroForm.value)
    // this.  filterData( minLevel: number, maxLevel: number = 10, name: string, abilities: string[] = [] ): void {
    this.sortData()
    this.filterData(this.minLevelFilter, this.maxLevelFilter, this.nameFilter, this.abilitiesFitler)


  }

  public addAbilityTo(): void {
    if (this.addAbilities.valid) {

      this.select_ability.push(this.addAbilities.value.abilities!);
      this.addAbilities.reset();
    }
  }
  // addAbility(): void {
  //   const abilitiesControl = this.heroForm.get('abilities');
  //   if (abilitiesControl) {
  //     const abilitiesValue = abilitiesControl.value;
  //     if (abilitiesValue &&!this.select_ability.includes(abilitiesValue)) {
  //       this.select_ability.push(abilitiesValue);
  //     }
  //   }
  // }
  ngOnInit() {
    this._appService.heroes$.subscribe((heroes: IHero[]) => {
      this.tableData = heroes;
    //this.tableData.push(this.heroForm.value);
    this.sortData();
    //this.filterData('name', ['ability1', 'ability2'], 1, 10);
  });
  }
  ngAfterViewInit(): void {
    this.sortData();
    this.filterData(this.minLevelFilter, this.maxLevelFilter, this.nameFilter, this.abilitiesFitler)
  }
  deleteRow(hero: IHero) {
    this._appService.deleteRow(hero);
    this.sortData()
    this.filterData(this.minLevelFilter, this.maxLevelFilter, this.nameFilter, this.abilitiesFitler)


  }

  sortData(): void {
    if (this.selectedSorting === 'По убыванию') {
      this.tableData.sort((a: IHero, b: IHero) => b.level - a.level);
    } else {
      this.tableData.sort((a: IHero, b: IHero) => a.level - b.level);
    }
    this._filter.powerFilter = this.selectedSorting
  }
  

  filterData( minLevel: number, maxLevel: number, name: string, abilities: string[] = [] ): void {
    this.nameFilter = this._filter.nameFilter = name;
    // /this.abilitiesFitler

    // infilter = this._filter.outFilter = name 

    //this.tableData = this._appService.setHeroes(this. hero);
    this._appService.heroes$.subscribe((heroes: IHero[]) => {
      // console.log(abilities)
      this.tableData = heroes
      .filter(hero => hero.level >= minLevel && (maxLevel === 0 || hero.level <= maxLevel))//.filter(hero => hero.level >= minLevel);
      .filter(hero => name.length >= 2 ? hero.name.toLowerCase().includes(name.toLowerCase()): true)
      .filter(hero => abilities.every(ability => hero.abilities.includes(ability)));
    });
    //this._appService._heroes$$.pipe(filter( hero => hero.level >= minLevel))
                                  //.filter(hero => hero.level <= maxLevel);
    // //this.tableData = this.tableData.filter(hero => hero.level <= maxLevel);
    // //this.tableData = this.tableData.filter(hero => name.length >= 2 ? hero.name.toLowerCase().includes(name.toLowerCase()): true);
    // //this.tableData = this.tableData.filter(hero => abilities.every(ability => hero.abilities.includes(ability)));

    // // if (this.prevMinLevel !== minLevel) {
    // //   this.prevMinLevel = minLevel;
    // //   this.tableData = this.tableData.filter(hero => hero.level >= minLevel);
    // // }
    this.cd.detectChanges(); // detect changes to update the view
  }

  }





