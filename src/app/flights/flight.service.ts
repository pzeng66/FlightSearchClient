import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError,map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http:HttpClient) { }
    flightNumber:string;
    originCity:string;
    destinationCity:string;
    travelDate:string;

  headers = new HttpHeaders({'Content-Type': 'application/json'});

  search(searchCriteria){
    this.flightNumber=searchCriteria['flightNumber'];
    if(this.flightNumber === null){
      this.flightNumber = "";
    }
    this.originCity=searchCriteria['origin'];
    if(this.originCity === null){
      this.originCity = "";
    }

    this.destinationCity=searchCriteria['destination'];
    if(this.destinationCity === null){
      this.destinationCity = "";
    }

    this.travelDate=searchCriteria['date'];

    console.log(this.flightNumber,this.originCity,this.destinationCity,this.travelDate);
   
    return this.http.get(`http://localhost:8080/flights/?flightNumber=${this.flightNumber}&departure=${this.travelDate}&origin=${this.originCity}&destination=${this.destinationCity}`,{headers:this.headers}).pipe(
      map(flights => flights),
      catchError(err => throwError(err))
    );
  }
}
