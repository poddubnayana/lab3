import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { HomeFormBuilderService } from '../home/home.create-form';
import { FormGroup } from '@angular/forms';
import { AppService } from '../services/app.service';
import { IHero } from '../interfaces/app.interface';

/** 
 * TO-DO {
 * 1) функция фильтрации должна быть одна  большая
 * 2) она должна применять все фильтры к исходному массиву!!! и потом отфильтрованный массив выводится
 * 3) применение фильтров(вызов функции) после добавления\удаления
 * 4) применение фильтров после переключения на мэйн пэйдж ( e.g. с таблицы или с 404 )
*/

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  public heroForm: FormGroup;
  public tableData: IHero[] = [];
  public selectedSorting: string = 'По возрастанию';
  public prevMinLevel: number = 0;

  constructor(
    private readonly _fb: HomeFormBuilderService,
    private readonly _appService: AppService,
    private readonly cd: ChangeDetectorRef
    
  ) {
    this.heroForm = this._fb.createHeroForm();
  }

  //@ViewChild('empTbSort') empTbSort = new MatSort();
  
  public select_ability: string[] = [
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
  ];

  public sorting: string[] = [
    'По возрастанию',
    'По убыванию',
  ];
  

  createHero(): void {
    this._appService.setHeroes(this.heroForm.value);
    console.log(this.heroForm.value)
  }

  addAbility(): void {
    const abilitiesControl = this.heroForm.get('abilities');
    if (abilitiesControl) {
      const abilitiesValue = abilitiesControl.value;
      if (abilitiesValue &&!this.select_ability.includes(abilitiesValue)) {
        this.select_ability.push(abilitiesValue);
      }
    }
  }

  ngOnInit() {
    this._appService.heroes$.subscribe((heroes: IHero[]) => {
      this.tableData = heroes;
    //this.tableData.push(this.heroForm.value);
    console.log(this.tableData);
    this.sortData();
    this.filterData(0);
  });
  }

  deleteRow(hero: IHero) {
    this._appService.deleteRow(hero);
  }

  sortData(): void {
    if (this.selectedSorting === 'По убыванию') {
      this.tableData.sort((a: IHero, b: IHero) => b.level - a.level);
    } else {
      this.tableData.sort((a: IHero, b: IHero) => a.level - b.level);
    }
  }

  filterData(minLevel: number): void {
    if (minLevel === 0) {
      this.tableData = this.tableData; // reset the tableData to the original array
    } else if (this.tableData) {
      this.tableData = this.tableData.filter(hero => hero.level >= minLevel);
    }

    // if (this.prevMinLevel !== minLevel) {
    //   this.prevMinLevel = minLevel;
    //   this.tableData = this.tableData.filter(hero => hero.level >= minLevel);
    // }
    this.cd.detectChanges(); // detect changes to update the view
  }

  }





