import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']

})
export class FlightSearchComponent implements OnInit {

  searchForm: FormGroup;
  triggerValidations:boolean;
  @Output() formSearch =new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.searchForm = this.fb.group({
      flightNumber:  ['',[Validators.required]],
      origin:  ['',[Validators.required,Validators.pattern(/^[a-zA-Z]*$/)]],
      destination:  ['',[Validators.required,Validators.pattern(/^[a-zA-Z]*$/)]],
      date: ['',[Validators.required]],
    });

    this.searchForm.get('flightNumber').valueChanges.pipe(debounceTime(1000)).subscribe(value => {
      if(!!value)
      {
        this.searchForm.get('origin').clearValidators();
        this.searchForm.get('origin').updateValueAndValidity();
        this.searchForm.get('destination').clearValidators();
        this.searchForm.get('destination').updateValueAndValidity();
      }
    } );

    let originCity=this.searchForm.get('origin');

    let destinationCity=this.searchForm.get('destination');

    (originCity || destinationCity).valueChanges.pipe( debounceTime(1000)).subscribe(value => {
      if(!!value){
      this.searchForm.get('flightNumber').clearValidators();
      this.searchForm.get('flightNumber').updateValueAndValidity();
      }
    } );

  }

  clickSubmit() {
    this.triggerValidations=true;

    if (this.searchForm.invalid) {
      return;
    }
    else{
    this.formSearch.emit(this.searchForm.value);
    this.searchForm.reset();
    this.triggerValidations=false;
    }
  }



}
