import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { PusherService } from '../pusher.service';
import { Chart } from 'angular-highcharts';
import {EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

interface Message {
   text:String;
  user: string;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})


export class MessagesComponent implements OnInit {
  @ViewChild('googlemapaddress') public input: ElementRef;
  messages: Array<Message>;
  chart: Chart;

  public user:String="";
  public text:String="";
  constructor(private pusherService: PusherService,private el: ElementRef,private httpService: HttpClient) {
    this.messages = [];
  }

//Dynamic Pie chart
  pieChartOptions = {
    responsive: true
}

pieChartLabels =  ['JAN', 'FEB', 'MAR', 'APR', 'MAY'];

pieChartColor:any = [
  {
      backgroundColor: ['rgba(30, 169, 224, 0.8)',
      'rgba(255,165,0,0.9)',
      'rgba(139, 136, 136, 0.9)',
      'rgba(255, 161, 181, 0.9)',
      'rgba(255, 102, 0, 0.9)'
      ]
  }
]

pieChartData:any = [
  { 
      data: []
  }
];



 
 
  addSerie() {
    this.chart.addSerie({
      name: 'Line ' + Math.floor(Math.random() * 10),
      data: [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10)
      ]
    });
  }

  removePoint() {
    this.chart.removePoint(this.chart.ref.series[0].data.length - 1);
  }

  removeSerie() {
    this.chart.removeSerie(this.chart.ref.series.length - 1);
  }

  init() {
    let chart = new Chart({
      chart: {
        type: 'line',
      },
      title: {
        text: 'Linechart'
      },
      credits: {
        enabled: false
      },
   
      series: [{
        name: 'Line 1',
        data: [1, 2, 3]
      }]
    });
    chart.addPoint(4);
    this.chart = chart;
    chart.addPoint(5);
    setTimeout(() => {
      chart.addPoint(6);
    }, 2000);
  }
  addPoint() {
    if (this.chart) {
      this.chart.addPoint(Math.floor(Math.random() * 10));
    } else {
      alert('init chart, first!');
    }
  }

  ngOnInit() {
    this.init();
    this.httpService.get('./assets/sales.json', {responseType: 'json'}).subscribe(
      data => {
          this.pieChartData = data as any [];	 // FILL THE CHART ARRAY WITH DATA.
      },
      (err: HttpErrorResponse) => {
          console.log (err.message);
      }
  );
    this.pusherService.messagesChannel.bind('client-new-message', (message) => {
      this.messages.push(message);
    });
  }


  onChartClick(event) {
    console.log(event);
}

//pie chart end



  sendMessage(user: string, text: string) {
    const message: Message = {
       user: user,
       text: text,
    }
    this.pusherService.messagesChannel.trigger('client-new-message', message);
    this.messages.push(message);
    this.user="";
    this.text="";
  }

}
