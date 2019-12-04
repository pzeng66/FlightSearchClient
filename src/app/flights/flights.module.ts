import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightComponent } from './flight/flight.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightDisplayComponent } from './flight-display/flight-display.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 


@NgModule({
  declarations: [FlightComponent, FlightSearchComponent, FlightDisplayComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[FlightComponent, FlightSearchComponent, FlightDisplayComponent]
})
export class FlightsModule { }
