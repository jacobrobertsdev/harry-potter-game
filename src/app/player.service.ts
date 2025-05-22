import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
const STORAGE_KEY = 'hp-player';

export interface PlayerSettings {
  house: string | null;
  allowSounds: boolean;
}

@Injectable({ providedIn: 'root' })
export class PlayerService {
  score: number = 0;
  round: number = 1;
  name: string | null = null;
  house: string | null = null;
  allowSounds: boolean = false;
  backgroundMusic: Howl;

  constructor(@Inject(DOCUMENT) private document: Document) {
    const json = localStorage.getItem(STORAGE_KEY);
    if (json) {
      try {
        const settings: PlayerSettings = JSON.parse(json);
        this.house = settings.house ?? this.house;
        this.allowSounds = settings.allowSounds ?? this.allowSounds;
      } catch { }
    }
    this.backgroundMusic = new Howl({
      src: ['../assets/background-music.mp3'],
      loop: true,
      volume: 0.3,
    });
  }

  switchTheme(color: string) {
    localStorage.setItem('theme', JSON.stringify(color));
    const root = this.document.documentElement;
    root.style.setProperty('--background', color);

  }



  setScore(newScore: number) {
    this.score = newScore;
    localStorage.setItem('currentScore', JSON.stringify(newScore));
  }
  getScore() {
    return parseInt(localStorage.getItem('currentScore') || '0');
  }

  setRound(nextRound: number) {
    this.round = nextRound;
    localStorage.setItem('currentRound', JSON.stringify(nextRound));
  }
  getRound() {
    return parseInt(localStorage.getItem('currentRound') || '1');
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

  setHouse(house: string) {
    this.house = house;
    this.saveSettings();
  }

  setAllowSounds(allow: boolean) {
    this.allowSounds = allow;
    this.saveSettings();
    allow ? this.backgroundMusic.play() : this.backgroundMusic.stop();
  }

  getAllowSounds(): boolean {
    return this.allowSounds;
  }

  private saveSettings() {
    const settings: PlayerSettings = {
      house: this.house,
      allowSounds: this.allowSounds,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }

  playBackgroundMusic() {
    this.backgroundMusic.play();
  }
}
