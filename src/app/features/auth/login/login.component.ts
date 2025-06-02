import { Component } from '@angular/core';
import { SpotifyService } from '../../../core/services/spotify.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly clientId = 'b68bd256090348f8acc4f9f0fefd152f';

  constructor(private spotifyService: SpotifyService, private localStorageService: LocalStorageService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    try {
      const accessToken = this.localStorageService.getItem<string>('access_token');

      if (accessToken) {
        await this.router.navigate(['/stats']);
      } else {
        await this.spotifyService.redirectToAuthCodeFlow(this.clientId);
      }
    } catch (error) {
      console.error('Login error:', error);
      await this.router.navigate(['/']);
    }
  }
}
