import { Component, OnInit } from '@angular/core';
import {HttpClient} from  '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PusherService } from '../pusher.service';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit {

  constructor(private pusher: PusherService, private http: HttpClient, private spinnerService: Ng4LoadingSpinnerService) {}
  event = 'vote';
  vote = '';
  voted = false;
  
  

  

  playerData = [
    
    {
      name: 'Mo. Salah',
      goals: 30,
     
      assists: 12,
      shortName: 'salah',
      image: 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/250x250/p118748.png'
    },
    {
      name: 'Christian Eriksen',
      goals: 8,
      assists: 13,
      shortName: 'eriksen',
      image: 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/250x250/p80607.png',
    },
    {
      name: 'Harry Kane',
      goals: 26,
      assists: 5,
      shortName: 'kane',
      image:
        'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/40x40/p78830.png',
    },
    {
      name: "Kevin De'bruyne",
      goals: 10,
      assists: 17,
      shortName: 'kevin',
      image: 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/40x40/p61366.png',
    },
  ];
  voteCount = {
    salah: 0,
    kane: 0,
    eriksen: 0,
    kevin: 0,
  };

  castVote(player) {
    this.spinnerService.show();
    this.http
      .post(`vote`, { player })
      .subscribe((res: any) => {
       
        this.vote = res.player;
        this.voted = true;
      });
      this.spinnerService.hide();
  }
  pieChartColors =
  [
     
      {backgroundColor:"#95382A",borderColor: "rgba(148,159,177,1)"},
      {backgroundColor:"#97bbzd",borderColor: "rgba(148,159,177,1)"},
      {backgroundColor:"#97bbad",borderColor: "rgba(148,159,177,1)"},
      {backgroundColor:"#97bb0d",borderColor: "rgba(148,159,177,1)"},
      {backgroundColor:"#97bb1d",borderColor: "rgba(148,159,177,1)"},
      {backgroundColor:"#97bb6d",borderColor: "rgba(148,159,177,1)"},
      {backgroundColor:"#97bb7d",borderColor: "rgba(148,159,177,1)"},
      {backgroundColor:"#97bb8d",borderColor: "rgba(148,159,177,1)"},
      {backgroundColor:"#97bb9d",borderColor: "rgba(148,159,177,1)"}
  ];

  getVoteClasses(player) {
    

    return {
      elect: this.voted && this.vote === player,
      lost: this.voted && this.vote !== player,
      
    };
 
    
  }
  chartLabels: string[] = Object.keys(this.voteCount);
  chartData: number[] = Object.values(this.voteCount);
  chartType = 'bar';


  ngOnInit() {
    const channel = this.pusher.init();
    channel.bind('vote', ({ player }) => {
      this.voteCount[player] += 1;
      // Update the chartData whenever there's a new vote
      this.chartData = Object.values(this.voteCount);
    });
   }
 } 
