import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PlayerService } from 'src/app/player.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  showNavLinks: boolean = true;
  house: string | null = '';

  constructor(private router: Router, private playerService: PlayerService) {}

  ngOnInit(): void {
    let theme = localStorage.getItem('theme');
    if (theme) this.playerService.switchTheme(JSON.parse(theme));

    this.updateNavLinksVisibility(this.router.url);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateNavLinksVisibility(event.urlAfterRedirects);
        this.house = this.playerService.getHouse();
      }
    });
  }

  private updateNavLinksVisibility(url: string): void {
    this.showNavLinks = !(url === '/game' || url === '/game-over');
  }
}
