import { Component,
         Input,
         Output,
         EventEmitter } from '@angular/core';
import { Dialog, Button, InputText, Calendar } from 'primeng/primeng';

@Component ({
  selector: 'text-input',
  styles: [],
  directives: [ Dialog, Button, InputText, Calendar ],
  template: `
    <div>
     <p-dialog header="Create New Text Reminder" [(visible)]="display" modal="modal" showEffect="fade">

      <form class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix" (ngSubmit)="addText()">
        Phone Number
        <input pInputText type="text" [(ngModel)]="event.phone" name="phone" placeholder="e.g. 14151234567">
        <br>
        Text Message
        <input pInputText type="text" [(ngModel)]="event.text" name="text" placeholder="...add a text message">
        <br>
        Set Reminder Time
        <p-calendar [(ngModel)]="event.time" name="time" inputStyleClass="ui-calendar" dateFormat="yy-mm-dd" timeFormat="HH:mm:ss">
        </p-calendar>

        <button pButton class="ui-button" type="submit" label="Add"></button>
      </form>

      </p-dialog>

      <button type="text" class="ui-button" (click)="showDialog()" pButton label="Create Text Reminder"></button>
    </div>
  `
})

export class TextInput {
  @Output () emitText =  new EventEmitter();
  constructor () {}

  event = {
    phone: "",
    text: "",
    time: ""
  };

  display: boolean = false;

  addText() {
    console.log("hit add text button");
    console.log("event is ", this.event);
    this.emitText.next(this.event);
    this.display = false;
  }

  showDialog() {
    this.display = true;
  };

};
