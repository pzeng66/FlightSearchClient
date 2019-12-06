import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  searchForm: FormGroup;
  triggerValidations:boolean;
  @Output() formSearch =new EventEmitter();
  originCity;
  destinationCity;
  flightNumber;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.searchForm = this.fb.group({
      flightNumber:  ['',[Validators.required]],
      origin: '',
      destination: '',
      date: ['',[Validators.required]],
    });
    
     this.originCity=this.searchForm.get('origin');

     this.destinationCity=this.searchForm.get('destination');

     this.flightNumber= this.searchForm.get('flightNumber');

     this.flightNumber.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
        if(!!value)
        {
            this.testOriginDestinations();
        }
      } );

    
      (this.originCity || this.destinationCity).valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
        if(!!value){
          this.flightNumber.clearValidators();
          this.flightNumber.updateValueAndValidity();
        }
        else{
          this.flightNumber.setValidators(Validators.required);
          this.flightNumber.updateValueAndValidity();
        }
      } );

    this.testOriginDestinations();
    
}

testOriginDestinations(){
  this.originCity.valueChanges.pipe(distinctUntilChanged()).subscribe((value)=>{
      
    if(this.originCity.pristine){
      this.destinationCity.setValidators(Validators.pattern(/^[a-zA-Z]*$/));
      this.destinationCity.updateValueAndValidity();
    }
    else if((!!value)){
      this.destinationCity.setValidators([Validators.required,Validators.pattern(/^[a-zA-Z]*$/)]);
      this.destinationCity.updateValueAndValidity();
    }
    else{
      this.destinationCity.setValidators(Validators.pattern(/^[a-zA-Z]*$/));
      this.destinationCity.updateValueAndValidity();
    }
  });

  this.destinationCity.valueChanges.pipe(distinctUntilChanged()).subscribe((value)=>{
    
  if(this.destinationCity.pristine){
    this.originCity.setValidators(Validators.pattern(/^[a-zA-Z]*$/));
    this.originCity.updateValueAndValidity();
    }
    else if((!!value)){
      this.originCity.setValidators([Validators.required,Validators.pattern(/^[a-zA-Z]*$/)]);
      this.originCity.updateValueAndValidity();
    }
  else{
    this.originCity.setValidators(Validators.pattern(/^[a-zA-Z]*$/));
    this.originCity.updateValueAndValidity();
  }
  });
}


clickSubmit() {
        this.triggerValidations=true;

        if (this.searchForm.invalid) {
          return;
        }
        else{
        this.formSearch.emit((this.searchForm.value));
        this.triggerValidations=false;
        }
      }
}
