import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  // we configure getDishes() to return promise by enclosing this dish object inside a promise. 
  // If the promise resolves then the result delivered by the getDishes promise would be a dish array.
  getDishes():Promise<Dish[]>{
    return Promise.resolve(DISHES);  
    // Promise.resolve(object) is only used for cases when we know we can return the results IMMEDIATELY.
    // later we'll synchronize delay to have a taste of another promise.then() method.
  
  }

  getDish(id: string): Promise<Dish>{
    return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  }

  getFeaturedDish(): Promise<Dish>{
    return Promise.resolve(DISHES.filter((dish) => (dish.featured))[0]);

  }
}
