import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-flight-display',
  templateUrl: './flight-display.component.html',
  styleUrls: ['./flight-display.component.css']
})
export class FlightDisplayComponent implements OnInit, OnChanges {

  @Input('flights') flights;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    console.log(this.flights);
  }

}
