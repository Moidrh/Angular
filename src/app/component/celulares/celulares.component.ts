import { Component, OnInit } from '@angular/core';
import { Celular } from '../../celular';
import { CelularService } from 'src/app/celular.service';

@Component({
  selector: 'app-celulares',
  templateUrl: './celulares.component.html',
  styleUrls: ['./celulares.component.css']
})
export class CelularesComponent implements OnInit {

  celulares: Celular[];

  constructor( private _celularService: CelularService) { }

  ngOnInit() {
    this.getCelulares();
  }

  getCelulares(): void {
    this._celularService.getCelulares().subscribe( celular => this.celulares = celular);
  }

  add( nombre: string): void {
    nombre = nombre.trim();
    if (!nombre) {
      return;
    }
    this._celularService.addCelular({nombre} as Celular)
    .subscribe( celular => {this.celulares.push(celular);
    });
  }

  delete ( celular: Celular): void {
    this.celulares = this.celulares.filter( c => c !== celular);
    this._celularService.deleteCelular(celular).subscribe();
  }

}
