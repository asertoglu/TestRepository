import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders(
      { 'Content-Type': 'application/json'
        //'Access-Control-Allow-Origin': '*'
      }
    )
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'http://localhost:8080/heroes/api/heroes';
  private heroUrl   = 'http://localhost:8080/heroes/api/hero/';
  private updateUrl = 'http://localhost:8080/heroes/api/updateHero';
  private addUrl    = 'http://localhost:8080/heroes/api/addHero';
  private deleteUrl = 'http://localhost:8080/heroes/api/deleteHero/';
  private searchUrl = 'http://localhost:8080/heroes/api/searchHeroes/';

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return this.httpClient.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
    }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return this.httpClient.get<Hero>(this.heroUrl+id)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  
  updateHero(hero: Hero): Observable<any> {
    return this.httpClient.put(this.updateUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log('update hero id=${hero.id}')),
        catchError(this.handleError<any>('updateHero'))
      )
  }

  addHero (hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(this.addUrl, hero, httpOptions)
      .pipe(
        tap((hero: Hero) => this.log(`added hero id=${hero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
    );
  }
  
  deleteHero(hero: Hero): Observable<Hero> {
    return this.httpClient.delete<Hero>(this.deleteUrl+hero.id, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${hero.id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }
  
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.httpClient.get<Hero[]>(this.searchUrl+term)
      .pipe(
        tap(_ => this.log(`found heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      )
  }
  constructor(private httpClient: HttpClient, 
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`HeroService - Hata Mesajı : ${message}`);
  }  

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error('HATA 1 : ' + error.message); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}