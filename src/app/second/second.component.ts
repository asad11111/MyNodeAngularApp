import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'dynamic-form',
  template: `





    <form style="margin: 0px 0px 0px 107px;" class="form-row" novalidate (ngSubmit)="onSubmit(form.value)" #formDir="ngForm" [formGroup]="form">
      <div  *ngFor="let prop of objectProps">
        <label style="font-weight:bolder;margin: 1px 0px 5px 27px;" [attr.for]="prop">{{prop.label}}</label>

        <div [ngSwitch]="prop.type">
          <input class="form-control" *ngSwitchCase="'text'" 
            [formControlName]="prop.key"
            [id]="prop.key" [type]="prop.type">
          
            <div [ngSwitch]="prop.type">
            ​<textarea style="margin: -24px 0px 0px 0px;" class="form-control" *ngSwitchCase="'textarea'"  [formControlName]="prop.key"
            [id]="prop.key"  rows="5" cols="40"></textarea>
           

          <div style=" margin: -29px 18px 1px 18px;" *ngSwitchCase="'radio'">
            <label *ngFor="let option of prop.options">
              <input class="form-control"
                type="radio"
                [name]="prop.key"
                [formControlName]="prop.key"
                [value]="option.value"> {{option.label}}
            </label>
          </div>

          <div style="margin: -19px 0px 0px 3px;" *ngSwitchCase="'select'">
            <select [formControlName]="prop.key">
              <option *ngFor="let option of prop.options" [value]="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>

        <div class="error" *ngIf="form.get(prop.key).invalid && (form.get(prop.key).dirty || form.get(prop.key).touched)">
            <div *ngIf="form.get(prop.key).errors.required">
              {{ prop.label }} is required.
            </div>
          </div>
      </div>
      </div>
      <p>
        <button   style="margin: 27px 0px 0px 30px;" class="btn-success"   [disabled]="form.invalid   " type="submit">Save</button>  <!-- && formDir.submitted  *ngIf="form.valid"  -->
      </p>
     </form>
    <hr />
    <strong>Form Value</strong>
    <pre>{{ form.value | json }}</pre>
    <strong>Form is valid:</strong> {{form.valid}}



    
  `,
  styles: [
    `
    .error { color: red; }
    
    `
  ]
})

export class DynamicFormComponent implements OnInit {
  @Input() dataObject;
  public isDisabled: any = false;
  form: FormGroup;
  objectProps;
obj:any=[];
  constructor() {
  }
  public DObj:any=[];

  
 ngOnInit() {
  // remap the API to be suitable for iterating over it.
 // console.log(this.dataObject, "dataObject");
  this.objectProps = 
   // console.log(Object.keys(this.dataObject), "object keys");
    Object.keys(this.dataObject)
      .map(prop => {
        //console.log(prop, "prop", this.dataObject[prop], "this.dataOb");
      // console.log( "Object.Assign", Object.assign({}, { key: prop} , this.dataObject[prop]), "sads");
        return Object.assign({}, { key: prop} , this.dataObject[prop]);
      });

  // setup the form
  const formGroup = {};
  

  for(let prop of Object.keys(this.dataObject)) {
   // formGroup[prop] = new FormControl(this.dataObject[prop].value || '', this.mapValidators(this.dataObject[prop].validation));
    formGroup[prop] = new FormControl({value: this.dataObject[prop].value || '', disabled: this.isDisabled},this.mapValidators(this.dataObject[prop].validation));
    console.log(  formGroup[prop] = new FormControl({value: this.dataObject[prop].value || '', disabled: this.isDisabled},this.mapValidators(this.dataObject[prop].validation)));
  }

  this.form = new FormGroup(formGroup);
  //console.log(this.form);
}

public notreq=false;

private mapValidators(validators) {
  const formValidators = [];

  if(validators) {
    for(const validation of Object.keys(validators)) {
      if(validation === 'required') {
        formValidators.push(Validators.required);
        this.notreq=true;
      } else if(validation === 'min') {
        formValidators.push(Validators.min(validators[validation]));
      }
    }
  }

  return formValidators;
}

onSubmit(form) {
  console.log(form);

}
}
