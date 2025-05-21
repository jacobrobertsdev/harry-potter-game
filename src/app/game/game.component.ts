import { Component, OnInit } from '@angular/core';
import { CharacterService, Character } from '../character.service';
import { PlayerService } from '../player.service';
import { Router } from '@angular/router';
import { Howl } from 'howler';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  characters: Character[] = [];
  currentCharacter!: Character;
  round: number = 0;
  maxRounds: number = 6;
  userHouse: string = '';
  houses: string[] = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
  feedback: string = '';
  score: number = 0;
  soundOn: boolean = true;
  characterSound: Howl | null = null;
  characterWrong: Howl | null = null;
  playerConfig: any;

  constructor(
    private characterService: CharacterService,
    private playerService: PlayerService,
    private router: Router
  ) {
    this.characterSound = new Howl({
      src: ['../assets/character-sound.mp3'],
    });

    this.characterWrong = new Howl({
      src: ['../assets/character-wrong.mp3'],
    });
  }

  ngOnInit(): void {
    let config = localStorage.getItem('hp-player');
    if (config) this.playerConfig = JSON.parse(config);
    this.soundOn = this.playerConfig['allowSounds'];

    this.score = parseInt(localStorage.getItem('currentScore') || '0');
    this.userHouse = this.playerService.getHouse() || '';
    this.characterService.getCharacters().subscribe((data) => {
      this.characters = data;
      this.loadNextCharacter();
    });
  }

  loadNextCharacter() {
    if (this.round >= this.maxRounds) {
      this.router.navigate(['/game-over']);
      return;
    }

    const randomIndex = Math.floor(Math.random() * this.characters.length);
    this.currentCharacter = this.characters[randomIndex];
    this.round++;
    this.feedback = '';
  }

  async makeGuess(selectedHouse: string) {
    const correct = selectedHouse === this.currentCharacter.hogwartsHouse;
    const isUserHouse = this.currentCharacter.hogwartsHouse === this.userHouse;

    let delta = 0;

    if (correct) {
      delta += 5;
      if (isUserHouse) delta += 2;
      this.feedback = 'Correct!';
      if (this.characterSound && this.soundOn) {
        this.characterSound.play();
      }
    } else {
      delta -= 5;
      if (isUserHouse) delta -= 2;
      this.feedback = `Incorrect! The correct house was ${this.currentCharacter.hogwartsHouse}`;
      if (this.characterWrong && this.soundOn) {
        this.characterWrong.play();
      }
    }

    const newScore = this.playerService.getScore() + delta;

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        this.loadNextCharacter();
        this.playerService.setScore(newScore);
        this.score = this.playerService.getScore();
        resolve();
      }, 1200);
    });

    this.characters.splice(this.characters.indexOf(this.currentCharacter), 1);
  }
}
