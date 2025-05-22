import { Component, Inject, OnInit } from '@angular/core';
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
    this.playerService.switchTheme('#1c004b');
    this.form.patchValue({
      allowSounds: this.playerService.getAllowSounds(),
      // house: this.playerService.getHouse() || '',
      house: '',
    });
    console.log(this.form.value);
  }

  onSubmit(): void {
    const { house } = this.form.value;
    this.playerService.setHouse(house);
    this.router.navigate(['/game']);
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

  setTheme(color: string) {
    this.playerService.switchTheme(color);
  }
}
