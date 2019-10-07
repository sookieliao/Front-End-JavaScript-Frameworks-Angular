import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string[];

  constructor(private dishService: DishService,
      @Inject('BaseURL') private baseURL) { }

  // whenever this component is created, ngOnInit() gets called.
  ngOnInit() {
    this.dishService.getDishes()
      .subscribe((dishes) => this.dishes = dishes,
        errmess => this.errMess = <any>errmess);
        // if, when we subscribe, an observable is returned, it'll be handled by the first method.
        // if an error is returned instead, we'll handle it and assign it to errMess.
  }

}
