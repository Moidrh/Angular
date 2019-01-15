import { Injectable } from '@angular/core';
import { Celular } from './celular';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {

    const celulares = [
      { id: 1, nombre: 'Oneplus6' },
      { id: 2, nombre: 'Galaxy note 9'},
      { id: 3, nombre: 'HTC Dream'},
      { id: 4, nombre: 'Nokia 6'},
      { id: 5, nombre: 'Galaxy S9'},
      { id: 6, nombre: 'Huawei P20 pro'},
      { id: 7, nombre: 'Motorola Moto x'},
      { id: 8, nombre: 'Motorola Moto g6'}
    ];
    return {celulares};
  }

  genId(celulares: Celular[]): number {
    return celulares.length > 0 ? Math.max(...celulares.map(celular => celular.id)) + 1 : 11;
  }

  constructor() { }
}
