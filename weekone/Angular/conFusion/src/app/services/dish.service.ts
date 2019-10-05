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
    return new Promise( resolve => {
      // simulate server laterncy with 2 seconds latency
      setTimeout(() => resolve(DISHES), 2000);  // this setTimeout() will error out in 2 mins and return the resolve() method.
    });  
  }

  getDish(id: string): Promise<Dish>{
    return new Promise( resolve => {
      // simulate server laterncy with 2 seconds latency
      setTimeout(() => resolve((DISHES.filter((dish) => (dish.id === id))[0])), 2000);  // this setTimeout() will error out in 2 mins and return the resolve() method.
    });  
  }
  
  getFeaturedDish(): Promise<Dish>{
    return new Promise( resolve => {
      // simulate server laterncy with 2 seconds latency
      setTimeout(() => resolve(DISHES.filter((dish) => (dish.featured))[0]), 2000);  // this setTimeout() will error out in 2 mins and return the resolve() method.
    });
  }
}
