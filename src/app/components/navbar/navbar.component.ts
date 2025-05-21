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

  onGamePage: boolean = this.router.url == '/game';


  constructor(private router: Router, private playerService: PlayerService) { }

  ngOnInit(): void {
    this.onGameOverPage = this.router.url === '/game-over';

    // Subscribe to route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.onGameOverPage = event.urlAfterRedirects === '/game-over';
      }
    });
  }

  /*
  navToHome() {
    if (this.onGamePage) {
      let userResponse = confirm("This will reset your game");
      if (userResponse) {
        localStorage.setItem('currentScore', JSON.stringify(0));
        localStorage.setItem('hp-player', JSON.stringify({}));
        this.router.navigate(['']);
      } else {
        return;
      }
    } 
    this.router.navigate(['']);
  }
    */

  navToHome(event: MouseEvent) {
    // Prevent the default anchor tag behavior
    event.preventDefault();

    if (this.onGamePage) {
      const userResponse = confirm("This will reset your game. Do you want to continue?");
      if (userResponse) {
        // Reset game logic
        localStorage.setItem('currentScore', JSON.stringify(0));
        localStorage.setItem('hp-player', JSON.stringify({}));
        this.router.navigate(['']); // Navigate to home
      }
    } else {
      this.router.navigate(['']); // Navigate to home if not on game page
    }
  }

}
