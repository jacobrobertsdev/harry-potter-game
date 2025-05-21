import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PlayerService } from 'src/app/player.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  onGameOverPage: boolean = this.router.url === '/game-over';

  constructor(private router: Router, private playerService: PlayerService) {}

  ngOnInit(): void {
    this.onGameOverPage = this.router.url === '/game-over';

    // Subscribe to route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.onGameOverPage = event.urlAfterRedirects === '/game-over';
      }
    });
  }
}
