import { Component,Output,EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
  <button (click)="sendNotification()">Notify my parent!</button>
`
})
 
export class ChildComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  sendNotification() {
      this.notifyParent.emit('Some value to send to the parent');
  }

}
