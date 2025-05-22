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
  displayedScore: number = 0; // This will be used for the animated score
  playerName: string = '';
  house: string | null = '';
  error: string = '';

  constructor(private playerData: PlayerService, private router: Router) {}

  ngOnInit(): void {
    this.score = parseInt(localStorage.getItem('currentScore') || '0');
    this.house = this.playerData.getHouse();
    this.startCounting();
    if (
      !this.playerData.backgroundMusic.playing() &&
      this.playerData.allowSounds
    ) {
      this.playerData.backgroundMusic.play();
    }
  }

  isNameTaken(name: string): boolean {
    let players = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    return players.some(
      (player: any) => player.name.toLowerCase() === name.toLowerCase()
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
      this.playerData.setScore(0);
    } else {
      this.error = 'Please enter your name before proceeding.';
    }
  }

  startCounting() {
    if (this.score === this.displayedScore) {
      return;
    }
    const stepValue = this.score > this.displayedScore ? 1 : -1;
    const interval = setInterval(() => {
      this.displayedScore += stepValue;
      if (this.displayedScore === this.score) {
        clearInterval(interval);
      }
    }, 50);
  }

  navToLeaderboard(event: Event) {
    event.preventDefault();
    this.savePlayer();
    if (!this.error) {
      this.playerData.setScore(0);
      this.playerData.setRound(1);
      this.router.navigate(['/leaderboard']);
    }
  }

  navToHome(event: Event) {
    event.preventDefault();
    this.savePlayer();
    if (!this.error) {
      this.playerData.switchTheme('#00000000');
      this.playerData.setScore(0);
      this.playerData.setRound(1);
      this.clearConfig();
      this.router.navigate(['/']);
    }
  }

  clearConfig() {
    this.playerData.setAllowSounds(false);
    this.playerData.setHouse('');
  }
}
