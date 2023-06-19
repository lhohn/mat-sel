import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, map, Observable, of, startWith, switchMap } from 'rxjs';
import { PropertyInformationDto } from './propertyInformationDto';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

type CreatePersonPerson = {
  bdIdent: FormControl<number>;
  nummer: FormControl<number>;
  title: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  function: FormControl<string>;
  zipcode: FormControl<string>;
  town: FormControl<string>;
  street: FormControl<string>;
  comment: FormControl<string>;
  officePhoneNr: FormControl<string>;
  mobilePhoneNr: FormControl<string>;
  privatePhoneNr: FormControl<string>;
  faxnr: FormControl<string>;
  email: FormControl<string>;
  flags: FormControl<number>;
  ident: FormControl<number>;
};
type CreatePersonFormModel = {
  person: FormGroup<CreatePersonPerson>;
  connectedProperties: FormArray<FormControl<PropertyInformationDto>>;
  selectedFiltered: FormControl<boolean>;
  search: FormControl<string>;
};

type CreatePersonFormGroup = FormGroup<CreatePersonFormModel>;
/**
 * @title Testing with MatButtonHarness
 */
@Component({
  selector: 'app-component',
  templateUrl: 'app-component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
})
export class AppComponent {
  createPersonForm: CreatePersonFormGroup = this.formBuilder.group({
    person: this.formBuilder.group({
      bdIdent: [0],
      nummer: [0],
      title: [''],
      firstName: ['', Validators.required],
      lastName: [''],
      function: [''],
      zipcode: [''],
      town: [''],
      street: [''],
      comment: [''],
      officePhoneNr: [''],
      mobilePhoneNr: [''],
      privatePhoneNr: [''],
      faxnr: [''],
      email: [''],
      flags: [0],
      ident: [0],
    }),
    selectedFiltered: [false],
    connectedProperties: this.formBuilder.array<
      FormControl<PropertyInformationDto>
    >([]),
    search: [''],
  });

  properties$ = apiServiceValues.pipe(
    map((x) => {
      return x;
    })
  );
  get connectedProperties(): FormArray<FormControl<PropertyInformationDto>> {
    return this.createPersonForm.controls.connectedProperties;
  }
  fProperties$ = this.createPersonForm.controls.search.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    switchMap((searchString) => {
      return this.properties$.pipe(
        // map(x => x)
        map((x) => {
          for (let i = 0; i < x.length; i++) {
            const formGroup: FormControl<PropertyInformationDto> =
              this.formBuilder.control(x[i]);
            this.connectedProperties.push(formGroup);
          }
        })
      );
    })
  );

  constructor(private formBuilder: NonNullableFormBuilder) {}
}

export const apiServiceValues: Observable<PropertyInformationDto[]> = of([
  {
    bdIdent: 0,
    name: 'Name',
    connectUrl: 'Url',
    connectName: 'Cname',
    phoneNr: '015764546',
    street: 'Teststrasse',
    city: 'Teststadt',
    zipCode: '53555',
    identifier: '1',
    comments: 'Kommentar',
    enviromentInfo: 'Env',
    connectAuth1: {
      key: 'k1',
      value: 'v1',
    },
    connectAuth2: {
      key: 'k2',
      value: 'v2',
    },
    connectAuth3: {
      key: 'k3',
      value: 'v3',
    },
    email: 'k4',
    notice: 'v4',
  },
]);
/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
