import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Character {
  fullName: string;
  nickname: string;
  hogwartsHouse: string;
  interpretedBy: string;
  children: string[];
  image: string;
  birthDate: string;
  index: number;
}

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private http: HttpClient) {}

  getCharacters() {
    return this.http.get<Character[]>(
      'https://potterapi-fedeperin.vercel.app/en/characters'
    );
  }
}

// Something like:
// CharacterService.getCharacters().subscribe(data => this.characters = data)
