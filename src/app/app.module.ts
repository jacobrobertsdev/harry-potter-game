import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { GameOverComponent } from './game-over/game-over.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    GameOverComponent,
    LeaderboardComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
