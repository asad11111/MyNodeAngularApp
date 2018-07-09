import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  template : `
  <app-child (notifyParent)="getNotification($event)"></app-child>
`
})

export class ParentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  getNotification(evt) {
    console.log("eventemitter", evt);
    // Do something with the notification (evt) sent by the child!
}
}
