import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  // we can convert an observable to promise by toPromise()
  // Limitation: promises will emit only one item, while observables are based on streams.
  getDishes():Promise<Dish[]>{
    // if we just need to return one value, we can use of(), which takes whatever value you wanna return.
    return of(DISHES).pipe(delay(2000)).toPromise();
  }

  getDish(id: string): Promise<Dish>{
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise();
  }
  
  getFeaturedDish(): Promise<Dish>{
    return of(DISHES.filter((dish) => (dish.featured))[0]).pipe(delay(2000)).toPromise();
  }
}
