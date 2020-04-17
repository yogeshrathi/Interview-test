import { MessageService } from './message.service';
import { EVENTS } from './eventList';
import { Events } from './event';
import { Injectable } from '@angular/core';
import{Observable, of} from 'rxjs'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  getEvents(): Observable<Events[]>{
    this.messageService.add('Event Service: fetched events' )
    return of (EVENTS);
  }

  constructor(private messageService : MessageService) { }
}
