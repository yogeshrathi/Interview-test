
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef  } from '@angular/core';
// import { AgmCoreModule } from '@agm/core';
import { Events } from './../event';
import * as moment from 'moment';
import{} from 'googlemaps'
declare var google: any;
let now = moment().format('LLLL');
@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css']
})


export class AddEventsComponent implements OnInit, AfterViewInit {
  title = 'appBootstrap';
  event  = new  Events;
  guestList : string[] = [];
  guest: string = "";
  temp : string = "";
  eventList: Events[]  = [];
  searchBox: google.maps.places.SearchBox;
  placesList = [];
  // lat: number = 43.653908;
  // lng: number = -79.384293;

  constructor() { 
  }
  ngOnInit(): void {
    this.eventList = JSON.parse(localStorage.getItem('list')) == null ? [] : JSON.parse(localStorage.getItem('list'));
  }
  
  ngAfterViewInit() {
    const DSLScript = document.createElement('script');
    DSLScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB4SClLrwlRjD3RjZ4yBADSC1ablmNG3mA&input=ahme'; // replace by your API key
    DSLScript.type = 'text/json';
    document.body.appendChild(DSLScript);
    document.body.removeChild(DSLScript);
    this.findPlacesInCity();
  }
 // findPlacesInCity() - Find places in the city.
 findPlacesInCity(): void {
  this.searchBox = new google.maps.places.SearchBox(document.getElementById('place-search') as HTMLInputElement);

  // Bias the SearchBox results towards current map's viewport.
  this.searchBox.setBounds(new google.maps.LatLngBounds(new google.maps.LatLng({ lat: 23.034, lng: 72.524 })));

  // more details for that place.
  this.searchBox.addListener('places_changed', () => {
    setTimeout(() => {
      let list = this.searchBox.getPlaces();
      this.placesList = [];
      if (list && list.length > 0) {
      }
    }, 500);
  });
}
  //addGuest - add guest to the guest array
  addGuest(): void{
    if(String(this.guest).trim() == ""){
        alert('Guest name cant be blank.')
        return;
    }
    else if(this.guestList.indexOf(this.guest) > -1){
      alert('Duplicate guest name found.')
      this.guest = '';
      return;
    }
    else{
      this.temp = this.guest;
      this.guestList.push(this.temp);
      this.guest = '';
    }
  }

  resetEventObj() :void{
    this.event.id = 0;
    this.event.title = "";
    this.event.startTime = "";
    this.event.startDate = "";
    this.event.endDate = "";
    this.event.endTime = "";
    this.event.isallDay = false;
    this.event.location = "";
    this.event.email = "";
    this.event.description = "";
    this.event.guestList = [];
  }
  
  //addEvent - add event to the event array


  addEvent(): void
  {
    
    if(String(this.event.title).trim() == ""){
      alert("Event Title can't be blank.")
      return;
    }
    else if(String(this.event.startDate).trim() == ""){
      alert("Event Start Date can't be blank.")
      return;
    }
    else if(String(this.event.startTime).trim() == ""){
      alert("Please select event start time.")
      return;
    }
    else if(String(this.event.endDate).trim() == ""){
      alert("Event End Date can't be blank.")
      return;
    }
    else if(String(this.event.endTime).trim() == ""){
      alert("Please select event end time.")
      return;
    }
    else if(String(this.event.location).trim() == ""){
      alert("Event location can't be blank.")
      return;
    }
    else if(String(this.event.email).trim() == ""){
      alert("Email can't be blank.")
      return;
    }
    else if(String(this.event.description).trim() == ""){
      alert("Event Description can't be blank.")
      return;
    }
    else if(this.guestList.length == 0){
      alert('Please add atleast one guest.');
      return;
    }
    else{
          let startDate = moment([this.event.startDate.year, this.event.startDate.month, this.event.startDate.day,
          this.event.startTime.hour, this.event.startTime.minute]);
          this.event.startDate = startDate.format('L');
          this.event.startTime = startDate.format('LT')

          let endDate = moment([this.event.endDate.year, this.event.endDate.month, this.event.endDate.day,
          this.event.endTime.hour, this.event.endTime.minute]);
          this.event.endDate = endDate.format('L');
          this.event.endTime = endDate.format('LT')

            let index = 0;
                for (let eve of this.eventList) {
                  if(this.event.startDate == eve.startDate){
                    if(eve.location == this.event.location){
                        alert('Location already booked for event : ' + eve.title)
                        return;
                        break;
                    }
                  }
                }
                  this.event.id = this.eventList.length + 1;
                  this.event.guestList = this.guestList;
                  let tempEvent = Object.assign({}, this.event);
                  this.eventList.push(tempEvent);
                  this.guestList = [];
                  
                  //push item in local storage
                  localStorage.setItem('list', JSON.stringify(this.eventList));
                  console.log(this.eventList);
                  alert('Event Added.')
                  //reset event obj
                  this.resetEventObj();
              }
  }

}
