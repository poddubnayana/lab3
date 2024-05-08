import { Component, ViewChild } from '@angular/core';
import { IHero } from '../interfaces/app.interface';
import { MatTable } from '@angular/material/table';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @ViewChild(MatTable) public table?: MatTable<IHero>

  displayedColumns: string[] = ['name', 'level', 'power', 'abilities','del'];

  public dataSource: IHero[] = [
    {
      name: 'Супермен',
      level: 8,
      power: 6,
      abilities: 'Летать',
    },
  ];

  constructor(
    private readonly _appService: AppService,
  ) { }

  public ngOnInit(): void {
    this._appService.heroes$.subscribe((heroes: IHero[]) => {
      this.dataSource = heroes;
      //console.log(this.dataSource);
    });
  }

  public deleteRow(row: IHero): void {
    this._appService.deleteRow(row);
    this.table?.renderRows();
  }

  
}
