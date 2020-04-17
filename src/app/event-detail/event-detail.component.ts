import { Events } from './../event';
import { Component, OnInit,Input, DebugElement } from '@angular/core';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  @Input() event: Events
  constructor() { } 
  ngOnInit(): void {
  }

  //deleteEvent - delete event from array
  deleteEvent(): void {
    let eventArr = JSON.parse(localStorage.getItem('list')) == null ? [] : JSON.parse(localStorage.getItem('list'));
    if(eventArr.length > 0){
     for (let eve of eventArr) {
       let match = eventArr.filter(() => eve.id == this.event.id);
       if(match.length > 0) {
        eventArr.splice(eventArr.indexOf(eve), 1)
        alert('Event Deleted.')
        break;
       } 
       
     }

     //update local storage
     localStorage.setItem('list', JSON.stringify(eventArr));
     window.location.reload();
    }
 }
  
}
