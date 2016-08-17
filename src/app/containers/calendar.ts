import { Component } from '@angular/core';
import { CalendarInput } from '../ui/index';
import { CalendarService } from '../services/index';
import { DomSanitizationService } from '@angular/platform-browser';

@Component ({
  selector: 'calendar',
  directives: [
    CalendarInput
  ],
  styles: [],
  template: `
    <calendar-input (emitAddition)="onEmitAddition($event)"></calendar-input>
    <iframe [src]="trustedUrl"
    style="border: 0"
    width="1024" height="768" frameborder="0" scrolling="no">
    </iframe>
  `
})

export class Calendar {
  calSrc = "";
  trustedUrl;

  loadCalendar() {
    this.calendarService.getCalendarId()
    .subscribe(res => {
        console.log("calendarId ", res._body);
        this.calSrc = "https://calendar.google.com/calendar/embed?src=" + res._body;
        this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.calSrc);
     });
  }

  constructor(private calendarService: CalendarService, private sanitizer: DomSanitizationService) {
    this.loadCalendar();
  }


  onEmitAddition(event: Object) {
    console.log("hit onEmitAddition");
    this.calendarService.addCalendarEvent(event)
    .subscribe(res => {
      console.log("event added ", res._body);
      this.loadCalendar();
    });
  }
};
