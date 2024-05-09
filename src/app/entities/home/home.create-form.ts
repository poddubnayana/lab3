import { Injectable } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable({
    providedIn: 'root',
  })

export class HomeFormBuilderService {

    constructor(private readonly _fb: FormBuilder) {}

    public createHeroForm(): FormGroup {
        return this._fb.group({
          name: new FormControl('', [Validators.required]),
          level: new FormControl('', [Validators.required]),
          power: new FormControl('', [Validators.required]),
          abilities: new FormControl([], [Validators.required]),
        });
    }

    public addAbilities(): FormGroup {
      return this._fb.group({
        abilities: new FormControl('', [Validators.pattern(/[a-zA-Zа-яёА-ЯЁ]/), Validators.required]),
      })
    };

    
}