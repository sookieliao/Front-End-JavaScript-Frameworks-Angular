import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService} from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatSliderModule } from '@angular/material/slider';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility',[
      state('shown',style({
        transform: 'scale(1.0)',
        opacity: 1
      })), 
      state('hidden', style({
        transform: 'scale(0.5)',
        opacity: 0
      })),
      // from whichever state to whichever state, I want the animation 
      // for transition to be 0.5 secons, easy-in-easy-out.
      transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  errMess: string[];
  dishCopy: Dish;

  commentForm: FormGroup;
  comment: Comment;
  @ViewChild('cform') commentFormDirective;
  visibility = 'shown';

  formErrors = {
    'author':'',
    'comment':''
  }
  
  validationMessages = {
    'author': {
      'required':'Author is required.',
      'minlength':'Must have at least 2 characters.',
      'maxlength':'Can not have more than 25 characters.'
    },
    'comment': {
      'required':'Comment is required.',
      'maxlength':'Can not have more than 225 characters.'
    }
  }

  constructor(private dishService: DishService, 
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    @Inject('BaseURL') private baseURL) { 
      this.createForm();
     }

  ngOnInit() {
    
    this.dishService.getDishIds()
      .subscribe(
        dishIds => this.dishIds = dishIds,
        errmess => this.errMess = <any>errmess
        );
    
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(params['id']); }))
      .subscribe(
        dish => { this.dish = dish; this.dishCopy = dish; this.setPreNext(dish.id); this.visibility = 'shown'; }, 
        errmess => this.errMess = <any>errmess
        );
  }

  setPreNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length]
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length]
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      'author': ['',[Validators.required, Validators.maxLength(25), Validators.minLength(2)]],
      'rating':'5',
      'comment': ['',[Validators.required, Validators.maxLength(225)]],
      'date':''
    });

    this.commentForm.valueChanges
      .subscribe( 
        data => this.onValueChanged(data),
        errmess => this.errMess = <any>errmess
        );

    this.onValueChanged();
  }

  onValueChanged(data?: any){
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear error message (if any)
        this.formErrors[field]='';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }  
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date= new Date().toISOString();
    console.log(this.commentForm.value);
    console.log(this.comment);
    this.dishCopy.comments.push(this.comment);
    this.dishService.putDish(this.dishCopy)
      .subscribe(dish => {
        this.dish = dish; this.dishCopy = dish;
      },
      errmess => {
        this.dish = null; this.dishCopy = null; this.errMess = <any>errmess;
      })

    this.commentFormDirective.resetForm();

  }

  goBack(): void {
    this.location.back();
  }
}
