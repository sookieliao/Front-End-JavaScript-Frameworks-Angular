import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  // Now instead of passing Promise to component, we'll just pass the Observables.

  getDishes():Observable<Dish[]>{
    return this.http.get<Dish[]>(baseURL + 'dishes');
  }

  getDish(id: string): Observable<Dish>{
    return this.http.get<Dish>(baseURL + 'dishes/' + id);
  }
  
  getFeaturedDish(): Observable<Dish>{
    return this.http.get<Dish>(baseURL + 'dishes?featured=true') // this will retrieve all the dishes with featured = true
      .pipe(map(dishes => dishes[0])); 
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
  }
}
