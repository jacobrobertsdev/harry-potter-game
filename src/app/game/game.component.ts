import { Component, OnInit } from '@angular/core';
import { CharacterService, Character } from '../character.service';
import { PlayerService } from '../player.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  characters:  Character[] = [];
  currentCharacter!: Character;
  round: number = 0;
  maxRounds: number = 10;
  userHouse: string = '';
  houses: string[] = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
  feedback: string = '';

  constructor(
    private characterService: CharacterService,
    private playerService: PlayerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userHouse = this.playerService.getHouse() || '';
    this.characterService.getCharacters().subscribe((data) => {
      this.characters = data.filter((char) => 
        this.houses.includes(char.hogwartsHouse)
      );

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

  makeGuess(selectedHouse: string) {
    const correct = selectedHouse === this.currentCharacter.hogwartsHouse;
    const isUserHouse = this.currentCharacter.hogwartsHouse === this.userHouse;

    let delta = 0;

    if (correct) {
      delta += 5;
      if (isUserHouse) delta += 2;
      this.feedback = 'Correct!'
    } else {
      delta -= 5;
      if (isUserHouse) delta -= 2;
      this.feedback = `Incorrect! The correct house was ${this.currentCharacter.hogwartsHouse}`;
    }

    const newScore = this.playerService.getScore() + delta;
    this.playerService.setScore(newScore);

    setTimeout(() => this.loadNextCharacter, 1500);
  }

  get currentScore() {
    return this.playerService.getScore();
  }

}
