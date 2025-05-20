import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  score: number = 0;
  name: string | null = null;
  house: string | null = null;

  constructor() {}

  setScore(newScore: number) {
    this.score = newScore;
  }

  getScore() {
    return this.score;
  }

  setName(newName: string) {
    this.name = newName;
  }

  getName() {
    return this.name;
  }

  getHouse() {
    return this.house;
  }
}
