import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient) { }

  getLeader(id: string): Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leadership/' + id); 
  } 

  getLeaders(): Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL + 'leadership');
  }

  getFeaturedLeader(): Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leadership?feature=true').pipe(map(leaders => leaders[0]));
  }
}
