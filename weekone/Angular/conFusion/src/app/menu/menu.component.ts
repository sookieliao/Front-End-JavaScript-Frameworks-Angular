import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  dishes: Dish[];
  selectedDish : Dish;

  constructor(private dishService: DishService) { }

  // whenever this component is created, ngOnInit() gets called.
  ngOnInit() {
    this.dishService.getDishes().then((dishes) => this.dishes = dishes); // when dishes is resolved, set this.dishes to it.
  }

  onSelect(dish: Dish){
    this.selectedDish = dish;
  }

}
