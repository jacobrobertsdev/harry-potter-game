import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlayerService } from '../player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  houses = ['Slytherin', 'Ravenclaw', 'Gryffindor', 'Hufflepuff'];

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private router: Router
  ) {
    this.form = this.fb.group({
      allowSounds: [false],
      house: [''],
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      allowSounds: this.playerService.getAllowSounds(),
      house: this.playerService.getHouse() || '',
    });
  }

  onSubmit(): void {
    const { allowSounds, house } = this.form.value;
    this.playerService.setHouse(house);
    this.router.navigate(['/game']);
    console.log('RAW LS:', localStorage.getItem('hp-player'));
  }

  isHouseSelected(h: string) {
    return this.form.value.house === h;
  }
  isSoundSelected(val: boolean) {
    return this.form.value.allowSounds === val;
  }

  enableSound() {
    this.playerService.setAllowSounds(true);
  }

  disableSound() {
    this.playerService.setAllowSounds(false);
  }
}
