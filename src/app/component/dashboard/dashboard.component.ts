import { Component, OnInit } from '@angular/core';
import { Celular } from '../../celular';
import { CelularService } from '../../celular.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  celulares: Celular[] = [];

  constructor(private _celularService: CelularService) { }

  ngOnInit() {
    this.getCelulares();
  }

  getCelulares(): void {
    this._celularService.getCelulares().subscribe(celulares => this.celulares = celulares.slice(0, 4));
  }

}
