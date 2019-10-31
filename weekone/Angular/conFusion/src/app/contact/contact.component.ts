import { Component, OnInit, ViewChild } from '@angular/core';
import { Feedback, ContactType } from '../shared/feedback';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flyInOut } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut()
  ]
})

export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  showFeedback: Feedback;
  hasFeedback: boolean;
  contactType = ContactType;
  errMess: string[];
  clearFeedback : boolean;
  initialLoad: boolean;

  @ViewChild('fform') feedbackFormDirective; // this gives us access to the template form.

  formErrors = {
    'firstname':'',
    'lastname':'',
    'telnum':'',
    'email':'',
    "message":''
  };

  validationMessages = {
    'firstname':{
      'required':'First name is required.',
      'minlength':'Must have at least 2 characters.',
      'maxlength':'Can not have more than 25 characters.'
    },
    'lastname':{
      'required':'Last name is required.',
      'minlength':'Must have at least 2 characters.',
      'maxlength':'Can not have more than 25 characters.'
    },
    'telnum':{
      'required':'Telephone number is required.',
      'pattern':'Only number is allowed.',
    },
    'email':{
      'required':'Email number is required.',
      'email':'Please enter in valid format.',
    },
    'message':{
      'maxlength':'Can not have more than 225 characters.'
    }
  };

  constructor(private formBuilder: FormBuilder,
    private feedbackService: FeedbackService) {
    this.createForm();
   }

  ngOnInit() {
    this.initialLoad = true;
    this.clearFeedback = true;
  }

  // when createForm() is called, the reactive form will be created. 
  // But we need to map this into the view/template
  createForm() {
    this.feedbackForm = this.formBuilder.group({
      firstname: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0,[Validators.required, Validators.pattern]],
      email: ['',[Validators.required,Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ['',Validators.maxLength(255)]
    });

    /*
      when the form experiences changes in any of it's form elements, 
      Angular framework provides an observable called as valueChanges observable. 
      We'll use the valueChanges observable on my feedback form.  
    */
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages.
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;  //We can do so IFF both model are exactly the same.
    

    // call feedbackService to post the data
    this.feedbackService.putFeedback(this.feedback)
      .subscribe(feedback => {
        this.showFeedback = feedback; console.log(this.showFeedback); this.clearFeedback = false; setTimeout(() => this.removeConfirmedFeedback() , 5000);;
      },
      errmess => {
        this.showFeedback = null; this.errMess = <any>errmess;
      })

    this.feedbackForm.reset({    //reset() takes one object property, to which it's going to reset to values.
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm(); // this will reset the template.
  }

  removeConfirmedFeedback() {
    this.showFeedback = null;
    this.clearFeedback = true;
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
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

}