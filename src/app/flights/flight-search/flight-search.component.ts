import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.searchForm = this.fb.group({
      flightNumber: '',
      origin: '',
      destination: '',
      date: '',
    });

  }

  clickSubmit() {
    console.log(this.searchForm);
    console.log(JSON.stringify(this.searchForm.value));
  }

}
