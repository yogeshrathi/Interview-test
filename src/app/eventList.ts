import { Events } from './event';

export const EVENTS: Events[] = JSON.parse(localStorage.getItem('list')) == null ? [] : JSON.parse(localStorage.getItem('list'));

