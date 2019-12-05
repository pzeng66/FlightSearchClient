import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { Flights} from '../flights';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {

  flightList;
  constructor(private service:FlightService) { }

  ngOnInit() {
  }

  searchDetails(formData){
    this.service.search(formData).subscribe((flights)=>{
      console.log("TCL: FlightSearchComponent -> clickSubmit -> flights", flights)
      this.flightList = flights;
      },
      (err)=>{
      console.log("TCL: FlightSearchComponent -> clickSubmit -> err", err)
       });
  }

  

}
