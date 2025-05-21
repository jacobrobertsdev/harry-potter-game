import { Component, OnInit } from '@angular/core';
import { Player } from '../player.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  houseTotals: any = {};
  leaderboard: Player[] = [];

  constructor() {}

  ngOnInit(): void {
    this.leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    this.houseTotals = {
      gryffindor: this.calculateHouseTotals('gryffindor'),
      slytherin: this.calculateHouseTotals('slytherin'),
      hufflepuff: this.calculateHouseTotals('hufflepuff'),
      ravenclaw: this.calculateHouseTotals('ravenclaw'),
    };
    console.log('House Totals:', this.houseTotals);
  }

  calculateHouseTotals(house: string): number {
    let total;
    if (this.leaderboard.length > 0) {
      total = this.leaderboard
        .filter(
          (player: Player) =>
            player.house && player.house.toLowerCase() === house.toLowerCase()
        )
        .reduce((total: number, player: Player) => total + player.score, 0);
    }

    return total || 0;
  }

  get sortedPlayers(): Player[] {
    return this.leaderboard.sort((a: Player, b: Player) => b.score - a.score);
  }
}
