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
    this.originCity=searchCriteria['origin'];
    this.destinationCity=searchCriteria['destination'];
    this.travelDate=searchCriteria['date'];

    console.log(this.flightNumber,this.originCity,this.destinationCity,this.travelDate);
   
    return this.http.get(`http://localhost:8080/flights/?flightNumber=${this.flightNumber}&departure=${this.travelDate}&origin=${this.originCity}&destination=${this.destinationCity}`,{headers:this.headers}).pipe(
      map(flights => flights),
      catchError(err => throwError(err))
    );
  }
}
