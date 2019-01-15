import { Component, OnInit } from '@angular/core';
import { CelularService } from '../../celular.service';
import { Celular } from '../../celular';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-celular-detail',
  templateUrl: './celular-detail.component.html',
  styleUrls: ['./celular-detail.component.css']
})
export class CelularDetailComponent implements OnInit {

  celular: Celular;

  constructor( private _activatedRoute: ActivatedRoute, private _location: Location,
                private _celularService: CelularService) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this._activatedRoute.snapshot.paramMap.get('id');
    this._celularService.getCelular(id).subscribe(celular => this.celular = celular);
  }

  goBack(): void {
    this._location.back();
  }

  save(): void {
    this._celularService.updateCelular(this.celular).subscribe(() => this.goBack());
  }

}
