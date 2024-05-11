import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FilterService {
  
  public nameFilter: string = '';
  public powerFilter: string = "По возрастанию";
  public abilitiesFitler: string[] = [];
  public minLevelFilter: number = 0;
  public maxLevelFilter: number = 10;

}
