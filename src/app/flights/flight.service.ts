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
   
  if((this.originCity !==""  || this.originCity !==null) && (this.destinationCity !==null || this.destinationCity !=="") && (this.flightNumber !==null || this.flightNumber !== "") && (this.travelDate !==null || this.travelDate != "")){
    console.log('one');
    return this.http.get(`http://localhost:8080/flights/${this.flightNumber}?departure=${this.travelDate}&origin=${this.originCity}&destination=${this.destinationCity}`,{headers:this.headers}).pipe(
      map(flights => flights),
      catchError(err => throwError(err))
    );
  }
  else if(this.flightNumber===null || this.flightNumber===""){
    console.log('two');
    return this.http.get(`http://localhost:8080/flights/?departure=${this.travelDate}&origin=${this.originCity}&destination=${this.destinationCity}`,{headers:this.headers}).pipe(
      map(flights => flights),
      catchError(err => throwError(err))
    );
  }
  else if((this.originCity ===null || this.originCity === "") && (this.destinationCity ===null || this.destinationCity === "")){
    console.log('three');
  return this.http.get(`http://localhost:8080/flights/${this.flightNumber}?departure=${this.travelDate}`,{headers:this.headers}).pipe(
    map(flights => flights),
    catchError(err => throwError(err))
  );
  }
  }
}
