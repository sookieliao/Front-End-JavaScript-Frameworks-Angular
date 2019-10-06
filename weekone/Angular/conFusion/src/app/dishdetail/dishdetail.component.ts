import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService} from '../services/dish.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish:Dish;
  dishIds: string[];
  prev: string;
  next: string;
  
  constructor(private dishService: DishService, 
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    
    this.dishService.getDishIds()
      .subscribe((dishIds) => this.dishIds = dishIds);
    /* 
       let id = this.route.snapshot.params['id'];
       the snapshot gives us a snapshot of that moment, but since we have Observables 
       now we'll directly access it whenever there's a change.
       whenever the params observable changes value(which means route parameter alter), 
       the switchMap operator will take the new value, fetch the new dish, and emit as a 
       new Observable. Eventuall, we subscribe to the new emitted Observable to retrieve 
       the dish object and map it into our declared variable. 
    */
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe((dish) => { this.dish = dish; this.setPreNext(dish.id); } );
  }

  setPreNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length]
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length]
  }

   
  goBack(): void {
    this.location.back();
  }

}
