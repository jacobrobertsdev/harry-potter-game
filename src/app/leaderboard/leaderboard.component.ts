import { Component, OnInit } from '@angular/core';

interface Player {
  name: string;
  score: string;
  house: string;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  players: Player[] = [];

  constructor() {}

  ngOnInit(): void {
    this.players = JSON.parse(localStorage.getItem('leaderboard') || '[]');
  }

  get sortedPlayers(): Player[] {
    return this.players.sort((a, b) => parseInt(b.score) - parseInt(a.score));
  }
}
