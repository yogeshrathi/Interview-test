import { EventsService } from './../events.service';
import { Events } from './../event';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
 selectedEvent : Events;
  eventList: Events[] ;
  constructor(private EventService: EventsService) { }

  ngOnInit() {
    this.getEvents()
  }

  onSelect(event: Events): void{
    this.selectedEvent = event;
  }
 
   getEvents() : void{
    this.eventList = JSON.parse(localStorage.getItem('list')) == null ? [] : JSON.parse(localStorage.getItem('list'));
    //  this.EventService.getEvents().subscribe(eventList => this.eventList=eventList);
   }
}
