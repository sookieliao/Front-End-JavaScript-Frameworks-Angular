import { Component, OnInit, ViewChild } from '@angular/core';
import { Feedback, ContactType } from '../shared/feedback';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
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

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
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
    console.log(this.feedback);
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