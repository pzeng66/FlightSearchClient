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
      origin:  ['',[Validators.pattern(/^[a-zA-Z]*$/)]],
      destination:  ['',[Validators.pattern(/^[a-zA-Z]*$/)]],
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
            this.destinationCity.clearValidators();
            this.destinationCity.updateValueAndValidity();
          }
          else if((!!value)){
            this.destinationCity.setValidators(Validators.required);
            this.destinationCity.updateValueAndValidity();
          }
          else{
            this.destinationCity.clearValidators();
            this.destinationCity.updateValueAndValidity();
          }
        });

        this.destinationCity.valueChanges.pipe(distinctUntilChanged()).subscribe((value)=>{
          
        if(this.destinationCity.pristine){
          this.originCity.clearValidators();
          this.originCity.updateValueAndValidity();
          }
          else if((!!value)){
            this.originCity.setValidators(Validators.required);
            this.originCity.updateValueAndValidity();
          }
        else{
          this.originCity.clearValidators();
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
