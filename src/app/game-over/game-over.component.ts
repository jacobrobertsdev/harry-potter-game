import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css'],
})
export class GameOverComponent implements OnInit {
  score: number = 0;
  playerName: string = '';
  house: string | null = '';
  error: string = '';

  constructor(private playerData: PlayerService, private router: Router) {}

  ngOnInit(): void {
    this.score = this.playerData.getScore();
    this.house = this.playerData.getHouse();
  }

  isNameTaken(name: string): boolean {
    let players = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    return players.some(
      (player: any) => player.name.toLowerCase() == name.toLowerCase()
    );
  }

  savePlayer() {
    if (this.playerName) {
      if (this.isNameTaken(this.playerName)) {
        this.error = 'Name taken. Please choose a different name.';
        return;
      }
      let players = JSON.parse(localStorage.getItem('leaderboard') || '[]');
      this.playerData.setName(this.playerName);

      players.push({
        name: this.playerName,
        score: this.score,
        house: this.house,
      });
      localStorage.setItem('leaderboard', JSON.stringify(players));
      this.error = '';
    } else {
      this.error = 'Please enter your name before proceeding.';
    }
  }

  navToLeaderboard(event: Event) {
    event.preventDefault();
    this.savePlayer();
    if (!this.error) {
      this.router.navigate(['/leaderboard']);
    }
  }

  navToHome(event: Event) {
    event.preventDefault();
    this.savePlayer();
    if (!this.error) {
      this.router.navigate(['/']);
    }
  }
}
