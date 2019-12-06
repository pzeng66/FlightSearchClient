import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-flight-display',
  templateUrl: './flight-display.component.html',
  styleUrls: ['./flight-display.component.css']
})
export class FlightDisplayComponent implements OnInit, OnChanges {

  @Input('flights') flights;

  setMsg:boolean;

  constructor() { }

  ngOnInit() {
    this.setMsg = false;
  }

  ngOnChanges(){
    if(this.flights.length===0){
      this.setMsg=true;
    }else{
      this.setMsg=false;
    }
   
  }

}
