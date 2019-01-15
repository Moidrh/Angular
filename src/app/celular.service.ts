import { Injectable, OnDestroy } from '@angular/core';
import { Celular } from './celular';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CelularService {

  private celularesUrl = 'api/celulares';

  constructor( private _messageService: MessageService, private _httpClient: HttpClient) { }

  getCelulares(): Observable<Celular[]> {
    this._messageService.add('Celulares obtenidos');
    return this._httpClient.get<Celular[]>(this.celularesUrl).pipe(
      tap(_ => this.log('Celulares obtenidos'), catchError(this.handleError('getCelulares', []))
      )
    );
  }

  getCelular( id: number): Observable<Celular> {
    const url = `${this.celularesUrl}/${id}`;
    return this._httpClient.get<Celular>(url).pipe(
      tap(_ => this.log(`Celular encontrado: ${id}`)),
      catchError( this.handleError<Celular>(`getCelular id=${id}`))
    );
  }

  updateCelular( celular: Celular ): Observable<Celular> {
    return this._httpClient.put(this.celularesUrl, celular, httpOptions).pipe(
      tap(_ => this.log(`Celular Actualizado: ${celular.id}`)),
      catchError(this.handleError<any>('updatedCelular'))
    );
  }

  addCelular( celular: Celular): Observable<Celular> {
    return this._httpClient.post<Celular>(this.celularesUrl, celular, httpOptions).pipe(
      tap(( celular: Celular) => this.log(`Celular añadido: ${celular.id}`)),
      catchError(this.handleError<Celular>('addHero'))
    );
  }

  deleteCelular( celular: Celular | number): Observable<Celular> {
    const id = typeof celular === 'number' ? celular : celular.id;
    const url = `${this.celularesUrl}/${id}`;

    return this._httpClient.delete<Celular>(url, httpOptions).pipe(
      tap(_ => this.log(`Celular Eliminado id=${id}`)),
      catchError(this.handleError<Celular>('deleteCelular'))
    );
  }

  searchCelular( term: string): Observable<Celular[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this._httpClient.get<Celular[]>(`${this.celularesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`Se encontraron aproximaciones a "${term}"`)),
      catchError(this.handleError<Celular[]>('searchCelular', []))
    );
  }


  private log( message: string) {
    this._messageService.add(`Celular Service: ${message}`);
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
